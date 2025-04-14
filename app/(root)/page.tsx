import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser} from "@/lib/actions/auth.action";
import {getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action"
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Page = async() =>{
  const user = await getCurrentUser();
  const[userInterview,latestInterview] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({userId:user?.id!})
  ])
  const hasPastInterview = userInterview?.length! > 0;
  const hasUpcomingInterview = latestInterview?.length! >0;
  return(
    <>
    <section className="card-cta">
      <div className="flex flex-col gap-6 max-w-lg">
        <h2>Get Interview Ready with Ai-powered Practice</h2>
        <p className="text-lg">Practice on real interview question and get Instant feedback</p>
        <Button asChild className="btn-primary max-sm:w-full">
          <Link href="/interview">Start an Interview</Link>
        </Button>
      </div>
      <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
    </section>
    <section className="flex flex-col gap-6 mt-8">
      <h2>Your Interview</h2>
      <div className="interviews-section">

       {

        hasPastInterview ?(
          userInterview?.map((interview)=>(
            <InterviewCard {...interview} key={interview.id}/>
          ))
        ):<p>You haven't taken any interview yet</p>
       
      }
      </div>
    </section>
    <section className="flex flex-col gap-6 mt-8">
      <h2>Taken an Interview</h2>
      <div className="interviews-section">
      {

          hasUpcomingInterview ?(
            latestInterview?.map((interview)=>(
              <InterviewCard {...interview} key={interview.id}/>
            ))
          ):<p>There no other interviews</p>

}
      </div>
    </section>
    </>
  )
}
export default Page;