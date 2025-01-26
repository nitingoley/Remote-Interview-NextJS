import { CODING_QUESTIONS, LANGUAGES } from "@/app/constants";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AlertCircleIcon, BookIcon, LightbulbIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const [selectedQuestion, setSelectedQuestion] = useState(CODING_QUESTIONS[0]);
  const [language, setLanguage] = useState<"javascript" | "python" | "java" | "golang" | "rust" | "c">(
    "javascript"
  );
  
  const [code, setCode] = useState(selectedQuestion.starterCode[language]);

  const handleQuestionChange = (questionId: string) => {
    const question = CODING_QUESTIONS.find((q) => q.id === questionId)!;
    setSelectedQuestion(question);
    setCode(question.starterCode[language]);
  };

  const handleLangugaeChange = (
    newLanguage: "javascript" | "python" | "java" | "golang" | "rust" | "c"
  ) => {
    setLanguage(newLanguage);
    setCode(selectedQuestion.starterCode[newLanguage]);
  };
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[calc-100vh-4rem-1px]"
    >
      {/* question section  */}
      <ResizablePanel>
        <ScrollArea className="h-full">
          <div className="p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Header  */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {selectedQuestion.title}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Choose your language and solve the problem
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Select
                  value={selectedQuestion.id}
                  onValueChange={handleQuestionChange}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select question" />
                  </SelectTrigger>
                  <SelectContent>
                    {CODING_QUESTIONS.map((q) => (
                      <SelectItem key={q.id} value={q.id}>
                        {q.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={language} onValueChange={handleLangugaeChange}>
                  <SelectTrigger className="w-[190px]">
                    {/* select value  */}
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <img
                          src={`/${language}.png`}
                          alt={language}
                          className="w-5 h-5 object-contain"
                        />
                        {LANGUAGES.find((l) => l.id === language)?.name}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  {/* select content  */}

                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.id} value={lang.id}>
                        <div className="flex items-center gap-2">
                          <img
                            src={`/${lang.id}.png`}
                            alt={lang.name}
                            className="w-5 h-5 object-contain"
                          />
                          {lang.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* problem desc  */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <BookIcon className="size-5 text-primary/80" />
                <CardTitle>Problem Description</CardTitle>
              </CardHeader>
            </Card>

            {/* problems Example  */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <LightbulbIcon className="size-5 text-primary/80" />
                <CardTitle>Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-full w-full rounded-md border">
                  <div className="p-4 space-y-4">
                    {selectedQuestion.examples.map((example, index) => (
                      <div className="space-y-2" key={index}>
                        <p className="font-medium text-sm">
                          Example {index + 1}:
                        </p>
                        <ScrollArea className="h-full w-full rounded-md">
                          <pre className="bg-muted/50 p-3 rounded-lg text-sm font-mono">
                            <div>Input: {example.input}</div>
                            <div>Output: {example.output}</div>

                            {example.explanation && (
                              <div className="pt-2 text-muted-foreground">
                                Explanation: {example.explanation}
                              </div>
                            )}
                          </pre>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* constriants  */}

            {selectedQuestion.constraints && (
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <AlertCircleIcon className="size-5 text-blue-500" />
                  <CardTitle>Constraints</CardTitle>
                </CardHeader>
                <ul className="list-disc list-inside space-y-1.5 text-sm marker:text-muted-foreground">
                  {selectedQuestion.constraints.map((constraint, index) => (
                    <li key={index} className="text-muted-foreground">
                      {constraint}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />

      {/* code editor's  */}
      <ResizablePanel defaultSize={60} maxSize={100}>
        <div className="h-full relative">
          <Editor
            height={"100%"}
            defaultLanguage={language}
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(v) => setCode(v || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 18,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16, bottom: 16 },
              wordWrap: "on",
              wrappingIndent: "indent",
            }}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
