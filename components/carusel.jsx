import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { removeBrunch, setActiveBrunch } from "../store/brunch_store";

function BranchCard({ branch, isActive, onDelete, onSelect }) {
    const [isHovered, setIsHovered] = useState(false);

    const backgroundStyles = {
        backgroundImage: `url(/images/Component59.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: isActive ? "lighten" : undefined,
    };

    return (
        <div
            key={branch.id}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onSelect(branch.id)}
            className={`relative flex w-[132px] h-[84.9px] p-[12px_12px_8px_12px] flex-col justify-end items-start flex-shrink-0 rounded-[16px] cursor-pointer transition-all duration-300 ${isActive ? "border-[2px] border-[#F8BD00]" : ""
                }`}
            style={backgroundStyles}
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
                            onDelete(branch);
                        }}
                        className="w-6 h-6 hover:scale-110 transition-transform duration-300 text-black"
                    />
                </motion.div>
            )}

            <div className="flex w-[50px] p-[6px] bottom-1 left-1 justify-center items-center gap-[6px] flex-shrink-0 rounded-[22.11px] bg-white text-black font-[SimplerPro_HLAR] text-[16px] font-semibold">
                {branch.name}
            </div>

        </div>
    );
}

export default function BranchCarousel() {
    const brunches = useSelector((state) => state.brunch.brunches);
    const activeBrunch = useSelector((state) => state.brunch.activeBrunch);
    const dispatch = useDispatch();

    const handleDelete = (branch) => {
        if (brunches.length > 1) {
            dispatch(removeBrunch(branch.id));
        } else {
            console.log("לא ניתן למחוק, חייב להיות לפחות סניף אחד");
        }
    };

    const handleSelect = (id) => {
        dispatch(setActiveBrunch(id));
    };

    return (
        <div className="w-full overflow-x-auto scrollbar-none cursor-pointer">
            <div className="flex gap-2 pr-2">
                {brunches.map((branch) => (
                    <BranchCard
                        key={branch.id}
                        branch={branch}
                        isActive={branch.id === activeBrunch}
                        onDelete={handleDelete}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
        </div>
    );
}
