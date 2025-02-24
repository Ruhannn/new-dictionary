import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { WordData } from "../@types";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { cn } from "../lib/utils";

export default function Meaning({ data }: { data: WordData[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-8">
      {data.map((entry, i) => (
        <div
          key={i}
          className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            {i + 1}. {entry.word}
          </h2>
          <Tabs defaultValue={`definitions-of-${entry.word}`}>
            <TabsList className="mb-4">
              <TabsTrigger
                value={`definitions-of-${entry.word}`}
                className="cursor-pointer">
                Definitions
              </TabsTrigger>
              <TabsTrigger
                disabled={entry.phonetics.length === 0}
                className={cn(
                  entry.phonetics.length === 0
                    ? "cursor-not-allowed"
                    : "cursor-pointer",
                  "pointer-events-auto!"
                )}
                value={`phonetics-of-${entry.word}`}>
                Phonetics
              </TabsTrigger>
            </TabsList>

            <TabsContent value={`definitions-of-${entry.word}`}>
              {entry.meanings.map((meaning, mI) => (
                <motion.div
                  key={mI}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: mI * 0.1 }}
                  className="mb-4">
                  <h3 className="text-xl font-semibold text-secondary-foreground">
                    {meaning.partOfSpeech}
                  </h3>
                  {meaning.definitions.map((def, dI) => (
                    <motion.div
                      key={dI}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: dI * 0.05 }}
                      className="ml-4 mt-2">
                      <p className="text-muted-foreground">
                        <strong>Definition:</strong> {def.definition}
                      </p>
                      {def.example && (
                        <p className="text-sm text-muted-foreground mt-1">
                          <em>Example: {def.example}</em>
                        </p>
                      )}
                    </motion.div>
                  ))}
                  {(meaning.synonyms.length > 0 || meaning.antonyms) && (
                    <div className="mt-2 flex space-x-4">
                      {meaning.synonyms.length > 0 && (
                        <p className="text-sm">
                          <strong>Synonyms:</strong>{" "}
                          {meaning.synonyms.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value={`phonetics-of-${entry.word}`}>
              {entry.phonetics.length > 0 && (
                <div className="space-y-4">
                  {entry.phonetics.map((phonetic, pI) => (
                    <motion.div
                      key={pI}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: pI * 0.1 }}
                      className="flex items-center space-x-4">
                      <p className="text-lg font-medium">{phonetic.text}</p>
                      {phonetic.audio && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => new Audio(phonetic.audio).play()}>
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      )}
                      {phonetic.license && (
                        <a
                          href={phonetic.license.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:underline">
                          {phonetic.license.name}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      ))}
    </motion.div>
  );
}
