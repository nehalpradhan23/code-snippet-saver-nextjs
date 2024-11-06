import React, { useEffect, useState } from "react";
import { AddOutlined } from "@mui/icons-material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { FreeMode } from "swiper/modules";
import { useGlobalContext } from "@/Context/ContextApi";
import { access } from "fs";

export default function SwiperSelection() {
  const {
    darkModeObject: { darkMode },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    allTagsObject: { allTags },
    tagsClickedObject: { tagsClicked, setTagsClicked },
    sideBarMenuObject: { sideBarMenu },
    selectedTagsObject: { setSelectedTags },
  } = useGlobalContext();

  const [tagsSelected, setTagsSelected] = useState<boolean[]>([]); // for showing active tags

  // get selected tags
  useEffect(() => {
    setTagsClicked((prevTagsClicked) => {
      const newTagsClicked = allTags.reduce(
        (acc, tag, index) => {
          if (tagsSelected[index]) {
            // add tag
            if (!prevTagsClicked.includes(tag.name)) {
              acc.push(tag.name);
            }
          } else {
            if (prevTagsClicked.includes(tag.name)) {
              // remove tag
              const tagIndex = acc.indexOf(tag.name);
              if (tagIndex !== -1) {
                acc.splice(tagIndex, 1);
              }
            }
          }
          return acc;
        },
        [...prevTagsClicked]
      );
      return newTagsClicked;
    });
  }, [tagsSelected]);

  console.log("tags clicked: ", tagsClicked);

  // initially get all tags and set selected to false other than ALL -----------------------------
  useEffect(() => {
    if (allTags) {
      const newTagsSelected = Array(allTags.length).fill(false);
      newTagsSelected[0] = true;
      setTagsSelected(newTagsSelected);
    }
  }, [allTags]);

  useEffect(() => {
    if (sideBarMenu) {
      const newTagsSelected = Array(allTags.length).fill(false);
      const newTagsClicked = ["All"];
      newTagsSelected[0] = true;
      setTagsClicked(newTagsClicked);
      setTagsSelected(newTagsSelected);
    }
  }, [sideBarMenu]);

  // -----------------------------------------------
  function handleTagClick(index: number) {
    const newTagsSelected = [...tagsSelected];
    // if clicked all, turn all tags to false
    if (index === 0) {
      newTagsSelected[0] = true;
      for (let i = 1; i < newTagsSelected.length; i++) {
        newTagsSelected[i] = false;
      }
      setTagsSelected(newTagsSelected);
      return;
    } else {
      newTagsSelected[0] = false;
      newTagsSelected[index] = !newTagsSelected[index];
      setTagsSelected(newTagsSelected);
    }
    // if all tags are false, turn first one to true
    if (newTagsSelected.every((tag) => !tag)) {
      newTagsSelected[0] = true;
      setTagsSelected(newTagsSelected);
    }
  }

  // ===========================================================
  return (
    <div
      className={`${
        darkMode[1].isSelected ? "bg-slate-900 text-slate-400" : "bg-white"
      } p-3 rounded-lg flex gap-5 justify-between`}
    >
      <div className="overflow-x-auto pb-1">
        {/* <div className="overflow-x-auto w-[1112px]"> */}
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode={true}
          // pagination={{
          //   clickable: true,
          // }}
          modules={[FreeMode]}
          // modules={[FreeMode, Pagination]}
          className="mySwiper w-fit"
        >
          {allTags.map((tag, index) => (
            <SwiperSlide
              key={index}
              className={`${
                tagsSelected[index] ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleTagClick(index)}
            >
              {tag.name}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        onClick={() => setOpenNewTagsWindow(true)}
        className="bg-blue-500 hover:bg-blue-700 rounded-md px-3 flex gap-1 items-center text-white"
      >
        <AddOutlined sx={{ fontSize: 18 }} />
        <span>Tag</span>
      </button>
    </div>
  );
}
