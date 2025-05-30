"use client"

import { useState, useEffect } from "react"
import { SinglyLinkedList } from "@/utils/dataStructures/SinglyLinkedList"
import { FileText, RefreshCw, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs" // Assuming shadcn/ui like Tabs

interface ClinicalSummaryItem {
  id: string
  question: string
  answer: string
  type: "symptom" | "interaction" | "general" // Example types
  timestamp: string // ISO Date string or formatted string
  userId?: string
  sessionId?: string
}

// Mock data for demonstration
const mockSummaries: ClinicalSummaryItem[] = [
  {
    id: "sum1",
    question: "hola, me duele el corazon :((((",
    answer: "Lo siento mucho. La dolor en el pecho puede ser causado po...",
    type: "symptom",
    timestamp: "28/5/2025, 11:49:34 a. m.",
    userId: "user123",
    sessionId: "sessionABC",
  },
  {
    id: "sum2",
    question: "puedo tomar destrozzan??",
    answer: "❌ No se ha encontrado ningún medicamento registrado ofi...",
    type: "interaction",
    timestamp: "28/5/2025, 11:52:29 a. m.",
    userId: "user123",
    sessionId: "sessionABC",
  },
  {
    id: "sum3",
    question: "tengo dolor de cabeza, bommito, perdida vision...",
    answer: "Lo sentimos mucho. Con los síntomas que mencionas, como ...",
    type: "symptom",
    timestamp: "28/5/2025, 12:53:39 p. m.",
    userId: "user456",
    sessionId: "sessionXYZ",
  },
]

const ClinicalSummaryPage = () => {
  const [summaryListSLL, setSummaryListSLL] = useState<SinglyLinkedList<ClinicalSummaryItem>>(new SinglyLinkedList())
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<string>("All Summaries") // For Tabs

  // This would come from your API and chat session data
  const fetchSummaries = () => {
    setIsLoading(true)
    // Simulate fetching data
    setTimeout(() => {
      const newList = new SinglyLinkedList<ClinicalSummaryItem>()
      mockSummaries.forEach((summary) => newList.append(summary))
      setSummaryListSLL(newList)
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    fetchSummaries()
  }, [])

  const displayedSummaries = summaryListSLL.toArray().filter((summary) => {
    if (filter === "By User ID") return summary.userId === "user123" // Example filter
    if (filter === "By Session ID") return summary.sessionId === "sessionABC" // Example filter
    if (filter === "By Type" && summary.type === "symptom") return true // Example filter
    if (filter === "All Summaries") return true
    return false
  })

  const getBadgeColor = (type: ClinicalSummaryItem["type"]) => {
    switch (type) {
      case "symptom":
        return "bg-red-100 text-red-700"
      case "interaction":
        return "bg-blue-100 text-blue-700"
      case "general":
        return "bg-green-100 text-green-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <FileText className="mr-3 text-indigo-600" size={30} /> Clinical Summary Table
          </h1>
          <p className="text-slate-500 mt-1">View and filter clinical summaries from all sessions.</p>
        </div>
        <Button variant="outline" onClick={fetchSummaries} disabled={isLoading}>
          <RefreshCw size={16} className={`mr-2 ${isLoading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      <div className="bg-white p-6 shadow-sm rounded-lg border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-700 mb-1 flex items-center">
          <Filter size={18} className="mr-2 text-indigo-600" /> Filter Summaries
        </h2>
        <p className="text-sm text-slate-500 mb-4">Search and filter clinical summaries by different criteria.</p>
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="All Summaries">All Summaries</TabsTrigger>
            <TabsTrigger value="By User ID">By User ID</TabsTrigger>
            <TabsTrigger value="By Session ID">By Session ID</TabsTrigger>
            <TabsTrigger value="By Type">By Type</TabsTrigger>
          </TabsList>
        </Tabs>
        <p className="text-xs text-slate-400 mb-4">Showing {filter.toLowerCase()}.</p>
      </div>

      <div className="bg-white p-6 shadow-sm rounded-lg border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-700">Clinical Summaries</h2>
          <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-2.5 py-1 rounded-full">
            {displayedSummaries.length} records
          </span>
        </div>
        {isLoading ? (
          <p className="text-center text-slate-500 py-8">Loading summaries...</p>
        ) : displayedSummaries.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <FileText size={48} className="mx-auto mb-3 opacity-50" />
            <p className="font-semibold">No clinical summaries found</p>
            <p className="text-sm">Try adjusting your filters or refresh.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Question
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Answer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {displayedSummaries.map((summary) => (
                  <tr key={summary.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-normal text-sm text-slate-700 max-w-xs">{summary.question}</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-slate-600 max-w-md">{summary.answer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeColor(summary.type)}`}
                      >
                        {summary.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{summary.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClinicalSummaryPage
