import React from 'react'
import { IoMdClose } from "react-icons/io";
import useFetchDetail from '../hooks/useFetchDetail';

const Videoplay = ({ videoid, media_type, close }) => {

  const { data: videodata } = useFetchDetail(
    `/${media_type}/${videoid}/videos`
  );

  const trailer = videodata?.results?.find(
    (video) =>
      video.site === "YouTube" && video.type === "Trailer"
  );

  const videoKey = trailer?.key;

  return (
    <section className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
      <div className="relative bg-black w-full max-w-4xl aspect-video rounded">

       
        <button
          className="absolute -top-8 right-0 text-white text-3xl"
          onClick={close}
        >
          <IoMdClose />
        </button>

        {videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            className="w-full h-full rounded"
            allowFullScreen
          />
        ) : (
          <p className="text-white text-center mt-20">
            Loading trailer...
          </p>
        )}

      </div>
    </section>
  );
};

export default Videoplay;
