import React from 'react'

const CurrentTeam = (
  {teamCount}: {teamCount: number}
) => {
  return (
    <div className='flex items-center' >
      <h4 className='text-muted-foreground' >
        Team Members: {teamCount}/3
      </h4>
    </div>
  )
}

export default CurrentTeam
