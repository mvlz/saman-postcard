import React, { useEffect, useState } from 'react'
import { PostType, userDataType } from '../../types/interfaces'
import { deletePostById, getuserById } from '../services/CRUDServices';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import { successToast } from '../utility/toast';

export default function PostCard(props: PostType) {
  const { title, userId, body, id } = props
  const [userData, setUserData] = useState<userDataType>();
  const fetchSocials = async () => {

    const { data } = await getuserById(userId || 0);
    setUserData(data);
  };
  const deletePostHandler = async (id: number) => {
    try {
      await deletePostById(id);
      successToast('Post Deleted')
    } catch (error) { }
  };
  useEffect(() => {
    if (userId) fetchSocials()
  }, [])

  return (
    <div className="max-w-sm  lg:flex relative">
      <button
        type="button" className="text-red-400 absolute bottom-4 right-4 text-xs"
        onClick={() => id ? deletePostHandler(id) : null}
      >
        <ArchiveBoxXMarkIcon className="h-6 w-6 text-grey-600" aria-hidden="true" />
      </button>
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
