import { collection, query, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

export interface AnomalyLog {
    logId: string;
    anomalyId: number;
    cameraId: number;
    confidence: number;
    event: string;
    organizationId: number;
    timestamp: string;
    criticality: string;
}

export const subscribeToAnomalyLogs = (
  organizationId: number,
  callback: (anomalies: AnomalyLog[]) => void
) => {
  // Keep track of all anomalies with a unique key
  let anomalyMap: { [key: string]: AnomalyLog } = {};
  const unsubscribers: (() => void)[] = [];
  
  // Subscribe to all cameras in the organization
  const orgRef = collection(db, `organizations/${organizationId}/cameras`);
  
  const camerasUnsubscribe = onSnapshot(orgRef, (camerasSnapshot) => {
    // Clear previous camera subscriptions when camera list changes
    unsubscribers.forEach(unsub => unsub());
    unsubscribers.length = 0;
    
    // For each camera document, create a separate subscription to its logs
    camerasSnapshot.forEach((cameraDoc) => {
      const cameraId = cameraDoc.id;
      console.log(`Subscribing to logs for camera ${cameraId}`);
      const logsRef = collection(db, `organizations/${organizationId}/cameras/${cameraId}/logs`);
      
      const logUnsubscribe = onSnapshot(logsRef, (logsSnapshot) => {
        // When logs for this camera change, update the anomaly map
        logsSnapshot.docs.forEach(doc => {
          const data = doc.data();
          const uniqueKey = `${cameraId}-${doc.id}`;
          
          anomalyMap[uniqueKey] = {
            logId: doc.id,
            anomalyId: parseInt(data.anomalyId || '0'),
            cameraId: parseInt(cameraId),
            confidence: parseFloat(data.confidence || '0'),
            event: data.event || '',
            organizationId: parseInt(data.organizationId || organizationId.toString()),
            timestamp: data.timestamp || '0',
            criticality: data.criticality || 'Moderate'
          };
        });
        
        // After updating the map with the latest logs, send all anomalies to UI
        const sortedAnomalies = Object.values(anomalyMap)
          .sort((a, b) => parseFloat(b.timestamp) - parseFloat(a.timestamp));
        
        callback(sortedAnomalies);
      });
      
      // Store unsubscribe function for cleanup
      unsubscribers.push(logUnsubscribe);
    });
  });
  
  // Return a composite unsubscribe function
  return () => {
    unsubscribers.forEach(unsub => unsub());
    camerasUnsubscribe();
  };
};