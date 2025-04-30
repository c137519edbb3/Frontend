import React from 'react'

const SectionTitleButton = (props) => {
  return (
    <button
          type="button"
          class="text-gray-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-8"
        >
        {props.title}
        </button>
  )
}

export default SectionTitleButton
