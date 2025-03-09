import { useEffect, useState } from "react";
import { supabase } from "@/db/db";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Result {
  id: number;
  percentage: number;
  status: boolean;
  correct_answers: string[];
  answers: string[];
  language: string;
}

const Dashboard = () => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase.from("Result").select("*");
      if (error) console.error(error);
      else setResults(data as Result[]);
    };
    fetchResults();
  }, []);

  return (
    <div className="p-8 h-screen w-full flex flex-col items-center justify-center">
      <Card className="w-full max-w-4xl p-6">
        <h1 className="text-3xl font-semibold mb-6">User Results</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Correct Answers</TableHead>
              <TableHead>User Answers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.id}</TableCell>
                <TableCell>{result.percentage}%</TableCell>
                <TableCell
                  className={result.status ? "text-green-500" : "text-red-500"}
                >
                  {result.status ? "Passed" : "Failed"}
                </TableCell>
                <TableCell>{result.language}</TableCell>
                <TableCell>{result.correct_answers.join(", ")}</TableCell>
                <TableCell>{result.answers.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Dashboard;
