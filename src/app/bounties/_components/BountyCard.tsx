import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'
import { Zap } from 'lucide-react'

export default function BountyCard() {
  return (
    <Card className='border-[#d4d4d4] bg-white'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-xl font-bold text-[#303841]'>
            Need help with React component optimization
          </CardTitle>
          <Badge variant='secondary' className='bg-[#ff57221a] text-[#ff5722]'>
            $500
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className='mb-4 line-clamp-2 text-[#46515e]'>
          Looking for an experienced React developer to help optimize the performance of a complex dashboard component.
          The ideal candidate should have a strong understanding of React&apos;s rendering lifecycle and experience with
          performance profiling tools.
        </p>
        <div className='mb-4 flex flex-wrap gap-2'>
          <Badge variant='outline' className='bg-[#f8f9fa]'>
            React
          </Badge>
          <Badge variant='outline' className='bg-[#f8f9fa]'>
            Performance
          </Badge>
          <Badge variant='outline' className='bg-[#f8f9fa]'>
            Frontend
          </Badge>
        </div>
        <div className='flex items-center justify-between text-sm text-[#46515e]'>
          <div className='flex items-center space-x-2'>
            <Avatar className='h-6 w-6'>
              <AvatarImage src='/placeholder-avatar.jpg' alt='User' />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span>John Doe</span>
          </div>
          <span>Deadline: 7 days</span>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between border-t border-[#d4d4d4] pt-4'>
        <Button variant='outline' className='mr-2 flex-1'>
          View Details
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className='flex-1 bg-[#ff5722] text-white hover:bg-[#ff784e]'>
                <Zap className='mr-2 h-4 w-4' />
                Quick Apply
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Apply with your default profile and resume</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}
