import { reach } from "yup";
import Layout from "../components/Layout";

export default function VideoCarousel({ demos }) {
  const videos = [
    {
      id: 1,
      title: "Touch Screen Demo",
      src: "https://res.cloudinary.com/dyjz3ddks/video/upload/v1672861124/demos/IMG_6120_tow0ti.mov",
    },
    {
      id: 2,
      title: "Sound Mode Testing (Sound On!)",
      src: "https://res.cloudinary.com/dyjz3ddks/video/upload/c_scale,h_1280,w_720/v1672862667/demos/sstg-F8C9E0A5-11A7-4A55-BCB6-DD35E01724E1_hai1eo.mov",
    },
    {
      id: 3,
      title: "Prototype v1 (Sound On!)",
      src: "https://res.cloudinary.com/dyjz3ddks/video/upload/v1672860950/demos/IMG_6184_vd76nr.mov",
    },
  ];

  const handleMouseEnter = (e) => {
    const vid = e.target;
    vid.muted = true;
    vid.play();
  };

  // handle mouse leave
  const handleMouseLeave = (e) => {
    const vid = e.target;
    vid.muted = false;
    vid.currentTime = 0;
    vid.pause();
  };

  return (
    <Layout title="Tech Demos (Hire Me)">
      <h1 className="text-center pt-2 pb-2 card">
        {" "}
        Hover over a video to play. Hire me!
      </h1>
      <div className="grid md:grid-cols-3 md:gap-3">
        {videos.map((video) => (
          <div key={video.id} className="md:col-span-1">
            <div className="">
              <div className="">
                <h4 className="">{video.title}</h4>
                <video
                  width="240"
                  height="400"
                  controls
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
