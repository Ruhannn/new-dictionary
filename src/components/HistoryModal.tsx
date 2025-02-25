import { motion } from "framer-motion";
import { CircleX, X } from "lucide-react";
import toast from "react-hot-toast";
import { History, useHistoryStore } from "../store/history.store";
import { Button } from "./ui/button";

export default function HistoryModal({ history }: { history: History[] }) {
  const { clear, remove } = useHistoryStore();

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
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-sidebar-ring p-2 rounded-lg flex justify-between items-center group cursor-pointer">
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
              <div>
                <Button
                  onClick={() => remove(item)}
                  variant={"outline"}
                  className="shadow-none rounded-full transition-opacity duration-300 size-8 border-none opacity-0 group-hover:opacity-100">
                  <X />
                </Button>
              </div>
            </motion.div>
          ))}
      </div>

      <div className=""></div>
    </motion.div>
  );
}
