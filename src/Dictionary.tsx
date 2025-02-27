import { AnimatePresence, motion } from "framer-motion";
import { History } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HistoryModal from "./components/HistoryModal";
import Meaning from "./components/Meaning";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { useMeaning } from "./service/queries";
import { useHistoryStore } from "./store/history.store";

export default function Dictionary() {
  const { register, handleSubmit, setFocus, resetField } = useForm<{
    value: string;
  }>();
  const meaning = useMeaning();
  const { add, history } = useHistoryStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = (data: { value: string }) => {
    meaning.mutate(data.value, {
      onSuccess: () => {
        add({
          id: crypto.randomUUID(),
          word: data.value,
          createdAt: new Date(),
        });
      },
    });
  };
  useEffect(() => {
    setFocus("value");
  }, [setFocus]);

  return (
    <>
      {" "}
      {/* history button */}
      <div className="absolute top-4 right-4">
        <Button
          hidden={history.length === 0}
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          variant="outline">
          <History />
        </Button>
      </div>
      {/* history modal */}
      <AnimatePresence mode="wait">
        {isOpen && <HistoryModal history={history} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {/* main */}
        <Card className="w-full shadow-none rounded-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-primary">
              Dictionary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  autoComplete="off"
                  {...register("value", { required: true })}
                  placeholder="Enter a word..."
                  className="flex-grow"
                />
                <Button type="submit">Search</Button>
              </div>
            </form>

            <>
              {meaning.data && meaning.data.length > 0 ? (
                <Meaning data={meaning.data} />
              ) : (
                meaning.isError && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-8 text-center">
                    <div className="inline-block p-6 bg-gray-100 text-7xl rounded-full mb-4">
                      😭
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Word Not Found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Sorry, we couldn't find any definitions for that word.
                    </p>
                    <Button
                      onClick={() => {
                        resetField("value");
                        setFocus("value");
                      }}
                      variant="outline"
                      className="mt-2">
                      Try Another Word
                    </Button>
                  </motion.div>
                )
              )}
            </>
          </CardContent>
        </Card>
      </AnimatePresence>
    </>
  );
}
