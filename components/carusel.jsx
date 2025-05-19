import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { removeBrunch } from "../store/brunch_store";

export default function Carusel() {
    const [selectedId, setSelectedId] = useState(null);
    const brunches = useSelector((state) => state.brunch.brunches);
    const activeBrunchId = useSelector((state) => state.brunch.activeBrunchId);

    const dispatch = useDispatch();

    const handleDeleteConfirmation = (brunch) => {
        if (brunches.length > 1) {
            dispatch(removeBrunch(brunch.id));
        } else {
            console.log("לא ניתן למחוק, חייב להיות לפחות סניף אחד");
        }
    };
    return (
        <div className="w-full overflow-x-auto scrollbar-none">
            <div className="flex gap-2 pr-2">
                {brunches.map((branch) => (
                    <div
                        key={branch.id}
                        onClick={() => setSelectedId(branch.id)}
                        className={`relative flex w-[132px] h-[84.9px] p-[12px_12px_8px_12px] flex-col justify-end items-start flex-shrink-0 aspect-[132/84.9] rounded-[16px] bg-cover bg-center cursor-pointer transition-all duration-300
    ${selectedId === branch.id ? "ring-2 ring-[#F8BD00]" : ""}
    ${branch.id === activeBrunchId ? "border-[2px] border-[#F8BD00]" : ""}
  `}
                        style={{
                            backgroundBlendMode: selectedId === branch.id ? "lighten" : undefined,
                        }}
                    >


                        <div className="absolute buttom-2 right-2">
                            {selectedId === branch.id && (
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <TrashIcon
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteConfirmation(branch);
                                        }}
                                        className="w-6 h-6 hover:scale-110 transition-transform duration-300 text-black"
                                    />
                                </motion.div>
                            )}
                        </div>
                        <div className="text-[#000] font-[SimplerPro_HLAR] text-[16px] font-semibold mt-auto ml-auto self-start">
                            {branch.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
