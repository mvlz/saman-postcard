import { useEffect, useState } from 'react';
import './App.css';
import { getAllPosts } from './services/CRUDServices'
import PostCard from './components/PostCard';
import { PostType } from '../types/interfaces';
import Example from './components/Modal';
import { CreatePostForm } from './containers/CreatePostForm';
import Pagination from './components/Pagination';


function App() {
  const [pageItem, setPageItem] = useState({
    start: 0,
    end: 10
  })
  const [postData, setPostData] = useState<PostType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const fetchSocials = async () => {

    const { data } = await getAllPosts(pageItem.start, pageItem.end);
    setPostData(data);
  };

  useEffect(() => {
    fetchSocials()
  }, [pageItem])

  return (
    <div className="p-8  ">
      <Example open={openModal} setOpen={setOpenModal}>
        <CreatePostForm />
      </Example>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => setOpenModal(true)}> add new post</button>

      <div className="flex flex-wrap justify-center gap-4">

        {
          postData?.map((item: PostType) => {
            return (<PostCard key={item.id} {...item} />)
          })
        }
      </div>
      <Pagination setPageItem={setPageItem} />
    </div >
  );
}

export default App;
