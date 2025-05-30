"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { apiClient } from "../lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileText, Clock, RefreshCw } from "lucide-react"

interface ClinicalSummary {
  id: string
  question: string
  answer: string
  type: "interaction" | "symptom" | "general"
  timestamp: string
  userId: string
  sessionId: string
}

type FilterType = "all" | "user" | "session" | "type"

export const ClinicalSummary: React.FC = () => {
  const [summaries, setSummaries] = useState<ClinicalSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [filterValue, setFilterValue] = useState("")
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    loadAllSummaries()
  }, [])

  const loadAllSummaries = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await apiClient.getAllClinicalSummaries()
      setSummaries(data)
    } catch (error) {
      console.error("Failed to load summaries:", error)
      setError(error instanceof Error ? error.message : "Failed to load clinical summaries")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = async (filterType: FilterType) => {
    setActiveFilter(filterType)
    setFilterValue("")
    if (filterType === "all") {
      await loadAllSummaries()
    }
  }

  const handleSearch = async () => {
    if (!filterValue.trim() && activeFilter !== "all") {
      setError("Please enter a search value")
      return
    }

    try {
      setSearchLoading(true)
      setError("")
      let data: ClinicalSummary[]

      switch (activeFilter) {
        case "user":
          data = await apiClient.getClinicalSummariesByUser(filterValue)
          break
        case "session":
          data = await apiClient.getClinicalSummariesBySession(filterValue)
          break
        case "type":
          data = await apiClient.getClinicalSummariesByType(filterValue as "interaction" | "symptom" | "general")
          break
        default:
          data = await apiClient.getAllClinicalSummaries()
      }

      setSummaries(data)
    } catch (error) {
      console.error("Failed to filter summaries:", error)
      setError(error instanceof Error ? error.message : "Failed to filter summaries")
    } finally {
      setSearchLoading(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "interaction":
        return "bg-blue-100 text-blue-800"
      case "symptom":
        return "bg-red-100 text-red-800"
      case "general":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <span>Clinical Summary Table</span>
            </h1>
            <p className="text-muted-foreground mt-2">View and filter clinical summaries from all sessions</p>
          </div>
          <Button
            onClick={loadAllSummaries}
            variant="outline"
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Compact Filter Section */}
      <Card className="mb-4 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filter Summaries</CardTitle>
          <CardDescription className="text-sm">
            Search and filter clinical summaries by different criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs value={activeFilter} onValueChange={(value) => handleFilterChange(value as FilterType)}>
            <TabsList className="grid w-full grid-cols-4 h-9">
              <TabsTrigger value="all" className="text-xs">
                All Summaries
              </TabsTrigger>
              <TabsTrigger value="user" className="text-xs">
                By User ID
              </TabsTrigger>
              <TabsTrigger value="session" className="text-xs">
                By Session ID
              </TabsTrigger>
              <TabsTrigger value="type" className="text-xs">
                By Type
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-3">
              <p className="text-xs text-muted-foreground">Showing all clinical summaries</p>
            </TabsContent>

            <TabsContent value="user" className="mt-3">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="userId" className="text-xs">
                    User ID
                  </Label>
                  <Input
                    id="userId"
                    placeholder="Enter user ID..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <Button onClick={handleSearch} disabled={searchLoading} size="sm" className="self-end">
                  <Search className="h-3 w-3 mr-1" />
                  Search
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="session" className="mt-3">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="sessionId" className="text-xs">
                    Session ID
                  </Label>
                  <Input
                    id="sessionId"
                    placeholder="Enter session ID..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <Button onClick={handleSearch} disabled={searchLoading} size="sm" className="self-end">
                  <Search className="h-3 w-3 mr-1" />
                  Search
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="type" className="mt-3">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="type" className="text-xs">
                    Summary Type
                  </Label>
                  <select
                    id="type"
                    className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  >
                    <option value="">Select type...</option>
                    <option value="interaction">Interaction</option>
                    <option value="symptom">Symptom</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <Button onClick={handleSearch} disabled={searchLoading || !filterValue} size="sm" className="self-end">
                  <Search className="h-3 w-3 mr-1" />
                  Search
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Enhanced Clinical Summaries Table */}
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <span>Clinical Summaries</span>
            </span>
            <Badge variant="secondary" className="text-sm font-semibold">
              {summaries.length} records
            </Badge>
          </CardTitle>
          <CardDescription className="text-base">
            Comprehensive view of all clinical interactions and medical summaries
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : summaries.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No clinical summaries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2">
                    <TableHead className="font-bold text-foreground">Question</TableHead>
                    <TableHead className="font-bold text-foreground">Answer</TableHead>
                    <TableHead className="font-bold text-foreground">Type</TableHead>
                    <TableHead className="font-bold text-foreground">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaries.map((summary) => (
                    <TableRow key={summary.id} className="hover:bg-muted/50">
                      <TableCell className="max-w-xs py-4">
                        <div className="truncate font-medium" title={summary.question}>
                          {summary.question}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-sm py-4">
                        <div className="truncate" title={summary.answer}>
                          {summary.answer}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant="secondary" className={`${getTypeColor(summary.type)} font-medium`}>
                          {summary.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="font-mono">{formatTimestamp(summary.timestamp)}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
