import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Bookmark, Clock } from 'lucide-react'
import BountyCardFooter from './BountyCardFooter'

export default function BountyCard() {
  return (
    <Card className='border-[#d4d4d4] bg-white'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-xl font-bold text-[#303841]'>
            Need help with React component optimization
          </CardTitle>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary' className='bg-[#ff57221a] text-[#ff5722] flex items-center'>
              <span>$100 - $500</span>
            </Badge>
            <Bookmark className='h-5 w-5 mr-2 cursor-pointer' />
          </div>
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
          <div className='flex items-center space-x-4'>
            <div className='flex items-center'>
              <Clock className='mr-1 h-4 w-4 text-[#46515e]' />
              <span>3 days left</span>
            </div>
          </div>
        </div>
      </CardContent>
      <BountyCardFooter />
    </Card>
  )
}
