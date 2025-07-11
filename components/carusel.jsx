import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { removeBrunch, setActiveBrunch } from "../store/brunch_store";
import { setActiveStep } from "../store/step_store";

function BranchCard({ branch, isActive, onSelect, onDelete, index }) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            key={branch.id}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onSelect(index)}
            className={`relative flex w-[132px] h-[84.9px] p-[12px_12px_8px_12px] flex-col justify-end items-start flex-shrink-0 rounded-[16px] cursor-pointer transition-all duration-300 ${isActive
                ? "border-[2px] border-[#F8BD00] bg-yellow-100"
                : "border border-gray-300 bg-gray-200"
                }`}
        >
            {isHovered && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute bottom-2 right-2"
                >
                    <TrashIcon
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(branch, index);
                        }}
                        className="w-6 h-6 hover:scale-110 transition-transform duration-300 text-black"
                    />
                </motion.div>
            )}
            <div className="absolute flex bottom-2 left-2 justify-center items-center p-1 gap-[6px] flex-shrink-0 rounded-[22.11px] bg-white text-black font-[SimplerPro_HLAR] text-[16px] font-semibold">
                {branch.name}
            </div>
        </div>
    );
}

export default function BranchCarousel() {
    const brunches = useSelector((state) => state.brunch.brunches);
    const activeBrunch = useSelector((state) => state.brunch.activeBrunch || 0);
    const dispatch = useDispatch();

    const handleDelete = (branch, index) => {
        if (brunches.length > 1) {
            const brunchIndex = brunches.findIndex(b => b.id === branch.id);
            dispatch(removeBrunch(branch.id));
            if (brunchIndex > 0) {
                const prevBrunch = brunches[brunchIndex - 1];
                dispatch(setActiveBrunch(prevBrunch.id));
                dispatch(setActiveStep(2 + brunchIndex - 1));
            } else if (brunches.length > 1) {
                const nextBrunch = brunches[1];
                dispatch(setActiveBrunch(nextBrunch.id));
                dispatch(setActiveStep(2));
            } else {
                dispatch(setActiveStep(1));
            }
        } else {
            console.log("לא ניתן למחוק, חייב להיות לפחות סניף אחד");
        }
    };


    const handleSelect = (index) => {
        dispatch(setActiveBrunch(brunches[index].id));
    };

    return (
        <div
            className="w-full lg:w-[100%] overflow-x-auto scrollbar-none cursor-pointer"
            dir="rtl"
        >
            <div className="flex gap-2">
                {brunches.map((branch, index) => (
                    <BranchCard
                        key={branch.id}
                        branch={branch}
                        index={index}
                        isActive={index === activeBrunch}
                        onDelete={handleDelete}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
        </div>
    );
}