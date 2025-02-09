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
  
  const orgRef = collection(db, `organizations/${organizationId}/cameras`);
  
  const unsubscribe = onSnapshot(orgRef, (camerasSnapshot) => {
    const unsubscribers: (() => void)[] = [];
    
    camerasSnapshot.forEach((cameraDoc) => {
      const logsRef = collection(cameraDoc.ref, 'logs');
      const logUnsubscribe = onSnapshot(logsRef, (logsSnapshot) => {
        logsSnapshot.docs.forEach(doc => {
          const data = doc.data();
          const uniqueKey = `${cameraDoc.id}-${doc.id}`;
          
          anomalyMap[uniqueKey] = {
            logId: doc.id,
            anomalyId: parseInt(data.anomalyId),
            cameraId: parseInt(cameraDoc.id),
            confidence: data.confidence,
            event: data.event,
            organizationId: parseInt(data.organizationId),
            timestamp: data.timestamp,
            criticality: data.criticality
          };
        });
        
        const sortedAnomalies = Object.values(anomalyMap)
          .sort((a, b) => parseFloat(b.timestamp) - parseFloat(a.timestamp));
        
        callback(sortedAnomalies);
      });
      
      unsubscribers.push(logUnsubscribe);
    });
    
    // Cleanup function for all listeners
    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  });

  return unsubscribe;
};