import React, { useEffect, useState } from 'react'
import { PostType, userDataType } from '../../types/interfaces'
import { getuserById } from '../services/CRUDServices';

export default function PostCard(props: Omit<PostType, 'id'>) {
  const { title, userId, body } = props
  const [userData, setUserData] = useState<userDataType>();
  const fetchSocials = async () => {

    const { data } = await getuserById(userId || 0);
    setUserData(data);
  };

  useEffect(() => {
    if (userId) fetchSocials()
  }, [])

  return (
    <div className="max-w-sm lg:flex">
      <div className="h-48 lg:h-auto flex-none bg-cover rounded text-center overflow-hidden" >
      </div>
      <div className="border border-gray-400 bg-white rounded  p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{body}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{userData?.name}</p>
            <p className="text-gray-500">
              @{userData?.username}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
