import React, { useState } from "react";
import { IoChevronDown, IoCheckmark, IoClose } from "react-icons/io5";

export default function ItemDetails() {
  // ------------------------------------------------------------------
  // 1. ส่วนประกาศ State
  // ------------------------------------------------------------------
  // เปลี่ยนค่าเริ่มต้นให้เป็น Array ว่าง [] เพื่อรอรับข้อมูลจาก Database
  // const [collections, setCollections] = useState([]);

  // const [selectedCollection, setSelectedCollection] = useState("");
  // const [isCreatingNew, setIsCreatingNew] = useState(false);
  // const [newCollectionName, setNewCollectionName] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

  // ------------------------------------------------------------------
  // 2. แทรก useEffect ตรงนี้: สำหรับดึงข้อมูลตอนเปิดหน้าเว็บ
  // ------------------------------------------------------------------
  // useEffect(() => {
  //   const fetchCollections = async () => {
  //     try {
  //       // --- โค้ดในอนาคตเมื่อต่อ Backend (เช่น Supabase) ---
  //       // const { data, error } = await supabase.from('collections').select('*');
  //       // if (error) throw error;
  //       // if (data) setCollections(data);

  //       // --- โค้ดจำลองสำหรับตอนนี้ (ใส่ข้อมูลปลอมเข้าไปก่อน) ---
  //       setCollections([
  //         { id: "1", name: "My First Collection" },
  //         { id: "2", name: "Abstract Series" },
  //       ]);
  //     } catch (error) {
  //       console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
  //     }
  //   };

  //   fetchCollections();
  // }, []); // [] หมายถึงให้รันแค่ครั้งเดียวตอนโหลด Component เสร็จ

  // ------------------------------------------------------------------
  // 3. ส่วนฟังก์ชันจัดการการกระทำต่างๆ ของผู้ใช้
  // ------------------------------------------------------------------
  // const handleSelectChange = (e) => {
  //   if (e.target.value === "CREATE_NEW") {
  //     setIsCreatingNew(true);
  //     setSelectedCollection("");
  //   } else {
  //     setSelectedCollection(e.target.value);
  //   }
  // };

  // เปลี่ยนฟังก์ชันเป็น async เพื่อรองรับการคุยกับ Database
  // const handleAddCollection = async () => {
  //   if (newCollectionName.trim() === "") return;

  //   try {
  //     // --- โค้ดในอนาคตเมื่อต่อ Backend ---
  //     // const { data: newColFromDB, error } = await supabase
  //     //   .from('collections')
  //     //   .insert([{ name: newCollectionName.trim() }])
  //     //   .select()
  //     //   .single();
  //     //
  //     // if (error) throw error;
  //     // setCollections([...collections, newColFromDB]);
  //     // setSelectedCollection(newColFromDB.id);

  //     // --- โค้ดจำลองสำหรับตอนนี้ ---
  //     const newCol = {
  //       id: Date.now().toString(),
  //       name: newCollectionName.trim(),
  //     };
  //     setCollections([...collections, newCol]);
  //     setSelectedCollection(newCol.id);

  //     // เมื่อบันทึกเสร็จ ก็ปิดหน้าต่างสร้างใหม่
  //     setIsCreatingNew(false);
  //     setNewCollectionName("");
  //   } catch (error) {
  //     console.error("ไม่สามารถบันทึกข้อมูลได้:", error);
  //     alert("เกิดข้อผิดพลาดในการสร้างคอลเลกชันใหม่");
  //   }
  // };

  // const handleCancelCreate = () => {
  //   setIsCreatingNew(false);
  //   setNewCollectionName("");
  //   setSelectedCollection("");
  // };

  // ------------------------------------------------------------------
  // 4. ส่วนแสดงผล UI (return)
  // ------------------------------------------------------------------
  return (
    <div className="bg-white p-8 border border-gray-200 shadow-sm space-y-8 ">
      {/* 1. Item Name */}
      <div>
        <label className="block text-base font-bold text-black mb-3">
          Item Name *
        </label>
        <input
          type="text"
          placeholder="e.g. 'Silent Symphony #01'"
          className="w-full border border-gray-400 p-3 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-400 text-gray-800"
        />
      </div>

      {/* 2. Description */}
      <div>
        <label className="block text-base font-bold text-black mb-1">
          Description
        </label>
        <span className="block text-sm text-gray-500 mb-3">
          The description will be included on the item's detail page.
        </span>
        <textarea
          rows="4"
          placeholder="Provide a detailed description of your item."
          className="w-full border border-gray-400 p-3 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-400 text-gray-800 resize-y"
        ></textarea>
      </div>

      {/* 3. Collection */}
      {/* <div>
        <label className="block text-base font-bold text-black mb-1">
          Collection
        </label>
        <span className="block text-sm text-gray-500 mb-3">
          This is the collection where your item will appear.
        </span>

        {!isCreatingNew ? (
          <div className="relative">
            <select
              className="w-full border border-gray-400 p-3 appearance-none outline-none focus:border-black focus:ring-1 focus:ring-black bg-white cursor-pointer text-gray-800"
              value={selectedCollection}
              onChange={handleSelectChange}
            >
              <option value="" disabled hidden>
                Select collection
              </option>
              {collections.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
              <option disabled>──────────</option>
              <option value="CREATE_NEW">+ Create new collection</option>
            </select>
            <IoChevronDown className="absolute right-4 top-[1.1rem] text-gray-600 text-xl pointer-events-none" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter new collection name..."
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              className="w-full border border-gray-400 p-3 outline-none focus:border-black focus:ring-1 focus:ring-black text-gray-800"
              autoFocus
            />
            <button
              onClick={handleAddCollection}
              className="p-[14px] bg-black text-white hover:bg-gray-800 transition flex items-center justify-center border border-black"
              title="Save Collection"
            >
              <IoCheckmark className="text-xl" />
            </button>
            <button
              onClick={handleCancelCreate}
              className="p-[14px] border border-gray-400 text-gray-600 hover:bg-gray-100 transition flex items-center justify-center"
              title="Cancel"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
        )}
      </div> */}
      {/* 4. Category */}
      <div>
        <label className="block text-base font-bold text-black mb-1">
          Category
        </label>
        <span className="block text-sm text-gray-500 mb-3">
          Select a category to help users find your item.
        </span>
        <div className="relative">
          <select
            className="w-full border border-gray-400 p-3 appearance-none outline-none focus:border-black focus:ring-1 focus:ring-black bg-white cursor-pointer text-gray-800"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled hidden>
              Select category
            </option>
            <option value="visual art">Visual Art</option>
            <option value="craft and handmade">Craft & Handmade</option>
            <option value="music and sound">Music & Sound</option>
          </select>
          <IoChevronDown className="absolute right-4 top-[1.1rem] text-gray-600 text-xl pointer-events-none" />
        </div>
      </div>

      {/* 5. Quantity */}
      <div>
        <label className="block text-base font-bold text-black mb-1">
          Quantity
        </label>
        <span className="block text-sm text-gray-500 mb-3">
          The number of items that can be minted. No hidden costs.
        </span>
        <input
          type="number"
          min="1"
          placeholder="e.g. 1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border border-gray-400 p-3 outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-400 text-gray-800"
        />
      </div>

      <hr className="border-gray-100" />

      {/* 4. Price */}
      <div>
        <label className="block text-base font-bold text-black mb-3">
          Price *
        </label>
        <div className="flex items-center border border-gray-400 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
          <span className="pl-4 pr-3 py-3 font-semibold text-black">฿</span>
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            className="w-full p-3 outline-none bg-transparent placeholder-gray-400 text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
