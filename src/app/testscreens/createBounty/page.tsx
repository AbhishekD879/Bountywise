'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CalendarIcon, HelpCircle, X, Paperclip, Video, Mic, MessageSquare, DollarSign, Clock, Tag, FileText, ChevronRight, ChevronLeft, Upload } from 'lucide-react'
import { format } from 'date-fns'

interface Attachment {
  file: File;
  id: string;
}

const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
]

const tagOptions = [
  { value: 'legal', label: 'Legal', icon: '⚖️' },
  { value: 'finance', label: 'Finance', icon: '💰' },
  { value: 'technology', label: 'Technology', icon: '💻' },
  { value: 'design', label: 'Design', icon: '🎨' },
  { value: 'writing', label: 'Writing', icon: '✍️' },
  { value: 'marketing', label: 'Marketing', icon: '📢' },
]

export default function NewBountyForm() {
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState('')
  const [communicationMethod, setCommunicationMethod] = useState('chat')
  const [budget, setBudget] = useState<number | null>(null)
  const [currency, setCurrency] = useState(currencies[0])
  const [deadline, setDeadline] = useState<Date | undefined>()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = 'Title is required'
    if (description.length < 50) newErrors.description = 'Description must be at least 50 characters'
    if (tags.length === 0) newErrors.tags = 'Please select at least one tag'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (!communicationMethod) newErrors.communicationMethod = 'Please select a communication method'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = () => {
    if (validateStep2()) {
      console.log('Form submitted:', { title, description, tags, communicationMethod, budget, currency, deadline, attachments })
      // Here you would typically send the data to your backend
    }
  }

  const handleAddTag = (value: string) => {
    if (value && !tags.includes(value)) {
      setTags([...tags, value])
    }
  }

  const handleAddCustomTag = () => {
    if (customTag && !tags.includes(customTag)) {
      setTags([...tags, customTag])
      setCustomTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newAttachments = Array.from(e.target.files).map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9)
      }))
      setAttachments([...attachments, ...newAttachments])
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff5722] to-[#ff9800] flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full transition-all duration-500 ease-in-out transform"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-[#46515e]">Create New Bounty</h2>
          <div className="flex justify-center items-center mt-4">
            <div 
              className={`w-16 h-2 rounded-full transition-colors duration-300 ${step === 1 ? 'bg-[#ff5722]' : 'bg-[#d4d4d4]'}`}
            />
            <div 
              className={`w-16 h-2 rounded-full ml-2 transition-colors duration-300 ${step === 2 ? 'bg-[#ff5722]' : 'bg-[#d4d4d4]'}`}
            />
          </div>
        </div>

        <div className={`transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <div className="mb-6">
            <Label htmlFor="title" className="block mb-2 text-[#46515e] flex items-center">
              <FileText className="mr-2" />
              Bounty Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., Quick Legal Advice Needed"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300"
            />
            {errors.title && <p className="text-[#d9534f] text-sm mt-1">{errors.title}</p>}
          </div>

          <div className="mb-6">
            <Label htmlFor="description" className="block mb-2 text-[#46515e] flex items-center">
              <FileText className="mr-2" />
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of your problem..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-[#d4d4d4] min-h-[150px] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300"
            />
            <p className="text-sm text-[#46515e] mt-1">{description.length}/500 characters</p>
            {errors.description && <p className="text-[#d9534f] text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="mb-6">
            <Label htmlFor="tags" className="block mb-2 text-[#46515e] flex items-center">
              <Tag className="mr-2" />
              Tags
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="inline-block ml-2 w-4 h-4 text-[#46515e] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select relevant tags for your bounty</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Select onValueChange={handleAddTag}>
              <SelectTrigger className="w-full border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300">
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                {tagOptions.map((tag) => (
                  <SelectItem key={tag.value} value={tag.value}>
                    <span className="flex items-center">
                      <span className="mr-2">{tag.icon}</span>
                      {tag.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center mt-2">
              <Input
                placeholder="Add custom tag"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                className="mr-2 border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300"
              />
              <Button onClick={handleAddCustomTag} variant="outline" className="border-[#ff5722] text-[#ff5722] hover:bg-[#ff57221a] transition-all duration-300">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-[#ff57221a] border border-[#ff5722] text-[#ff5722] rounded-full text-sm flex items-center animate-fadeIn"
                >
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-[#ff5722]">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            {errors.tags && <p className="text-[#d9534f] text-sm mt-1">{errors.tags}</p>}
          </div>
        </div>

        <div className={`transition-opacity duration-300 ${step === 2 ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <div className="mb-6">
            <Label className="block mb-2 text-[#46515e] flex items-center">
              <MessageSquare className="mr-2" />
              Preferred Communication Method
            </Label>
            <RadioGroup value={communicationMethod} onValueChange={setCommunicationMethod} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video" className="flex items-center cursor-pointer">
                  <Video className="mr-2" />
                  Video
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="audio" id="audio" />
                <Label htmlFor="audio" className="flex items-center cursor-pointer">
                  <Mic className="mr-2" />
                  Audio
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chat" id="chat" />
                <Label htmlFor="chat" className="flex items-center cursor-pointer">
                  <MessageSquare className="mr-2" />
                  Chat
                </Label>
              </div>
            </RadioGroup>
            {errors.communicationMethod && <p className="text-[#d9534f] text-sm mt-1">{errors.communicationMethod}</p>}
          </div>

          <div className="mb-6">
            <Label htmlFor="budget" className="block mb-2 text-[#46515e] flex items-center">
              <DollarSign className="mr-2" />
              Budget (Optional)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="inline-block ml-2 w-4 h-4 text-[#46515e] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set your budget for this bounty</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center space-x-4">
              <div className="flex-1 flex items-center">
                <Select
                  value={currency.code}
                  onValueChange={(value) => setCurrency(currencies.find(c => c.code === value) || currencies[0])}
                >
                  <SelectTrigger className="w-[80px] border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((c) => (
                      <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="budget"
                  type="number"
                  value={budget === null ? '' : budget}
                  onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : null)}
                  className="flex-1 ml-2 border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300"
                  min={0}
                  max={1000000}
                  placeholder={`${currency.symbol}0.00`}
                />
              </div>
              <Slider
                value={budget !== null ? [budget] : [0]}
                onValueChange={(value) => setBudget(value[0])}
                max={1000}
                step={10}
                className="w-1/2"
                disabled={budget === null}
              />
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="deadline" className="block mb-2 text-[#46515e] flex items-center">
              <Clock className="mr-2" />
              Deadline (Optional)
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300 ${!deadline && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="mb-6">
            <Label htmlFor="attachment" className="block mb-2 text-[#46515e] flex items-center">
              <Paperclip className="mr-2" />
              Attachments (Optional)
            </Label>
            <div className="border-2 border-dashed border-[#d4d4d4] rounded-lg p-4 text-center cursor-pointer hover:border-[#ff5722] transition-all duration-300"
                 onClick={() => fileInputRef.current?.click()}>
              <Upload className="mx-auto h-12 w-12 text-[#46515e]" />
              <p className="mt-2 text-sm text-[#46515e]">Click or drag files to upload</p>
              <Input
                id="attachment"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
                multiple
              />
            </div>
            {attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-2 bg-gray-100 rounded animate-fadeIn"
                  >
                    <p className="text-sm text-[#46515e]">
                      {attachment.file.name} ({(attachment.file.size / 1024).toFixed(2)} KB)
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleRemoveAttachment(attachment.id)}
                      className="text-[#d9534f] hover:text-[#d9534f] hover:bg-[#d9534f]/10 transition-colors duration-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          {step === 2 && (
            <Button onClick={() => setStep(1)} variant="outline" className="border-[#ff5722] text-[#ff5722] hover:bg-[#ff57221a] transition-all duration-300">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {step === 1 ? (
            <Button onClick={handleNext} className="bg-[#ff5722] text-white hover:bg-[#ff784e] ml-auto transition-all duration-300">
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-[#ff5722] text-white hover:bg-[#ff784e] ml-auto transition-all duration-300">
              Post Bounty
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}