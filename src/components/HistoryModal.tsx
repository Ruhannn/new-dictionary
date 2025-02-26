import { AnimatePresence, motion } from "framer-motion";
import { CircleX, Pin, PinOff, X } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "../lib/utils";
import { History, useHistoryStore } from "../store/history.store";
import { Button } from "./ui/button";

export default function HistoryModal({ history }: { history: History[] }) {
  const { clear, remove, pinned } = useHistoryStore();

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-sidebar-accent shadow-lg  w-[320px] h-full absolute top-0 left-0 p-4 rounded-r-2xl z-50">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold">History</h2>
        <Button
          hidden={history.length === 0}
          variant={"outline"}
          onClick={() => clear()}>
          <CircleX />
        </Button>
      </div>
      <div className="space-y-2 overflow-y-auto h-[85vh]">
        {history
          .sort((a, b) => {
            if (a.pinned === b.pinned) {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            }
            return a.pinned ? -1 : 1;
          })

          .map((item, index) => (
            <AnimatePresence key={item.id}>
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                className={cn(
                  "p-2 rounded-lg flex justify-between items-center group cursor-pointer relative",
                  item.pinned ? "bg-yellow-200" : "bg-sidebar-ring"
                )}>
                {/* stat bg */}

                {item.pinned && (
                  <div className="absolute bg-yellow-300 block size-4 top-0 right-0 rounded-tr-lg rounded-bl-lg" />
                )}

                <div
                  onClick={() => {
                    navigator.clipboard.writeText(item.word);
                    toast.success("Copied to clipboard");
                  }}>
                  <p className="text-sm">{item.word}</p>
                  <p className="text-xs opacity-75">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <Button
                    onClick={() => {
                      pinned(item.id);
                    }}
                    variant={"outline"}
                    className="shadow-none rounded-full transition-opacity duration-300 size-8 border-none opacity-0 group-hover:opacity-100">
                    {item.pinned ? <PinOff /> : <Pin />}
                  </Button>
                  <Button
                    onClick={() => remove(item)}
                    variant={"outline"}
                    className="shadow-none rounded-full transition-opacity duration-300 size-8 border-none opacity-0 group-hover:opacity-100">
                    <X />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          ))}
      </div>

      <div className=""></div>
    </motion.div>
  );
}
