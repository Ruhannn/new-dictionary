import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Meaning from "./components/Meaning";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { useMeaning } from "./service/queries";

export default function App() {
  const { register, handleSubmit, setFocus, resetField } = useForm<{
    value: string;
  }>();
  const meaning = useMeaning();

  const onSubmit = (data: { value: string }) => {
    meaning.mutate(data.value);
  };
  useEffect(() => {
    setFocus("value");
  }, [setFocus]);
  return (
    <div className="min-h-screen">
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

          <AnimatePresence mode="wait">
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
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
