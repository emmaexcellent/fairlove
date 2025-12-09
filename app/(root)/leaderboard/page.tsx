import { getTopGifters } from "@/lib/appwrite/crud";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MostReactedNotes from "@/components/leaderboard/MostReactedNotes";
import TrendingAnonymousPosts from "@/components/leaderboard/TrendingAnonymousPosts";

export default async function LeaderboardPage() {
  const {data: topGifters} = await getTopGifters();

  return (
    <div className="w-full max-w-2xl mx-auto py-8 pt-20 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold serif text-foreground">
          Leaderboards
        </h1>
        <p className="text-foreground/70">
          See who's making the biggest impact in our community.
        </p>
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold serif text-foreground">
          Top Gifters
        </h2>
        <p className="text-foreground/70">
          See who's spreading the most love in our community.
        </p>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {topGifters.map((gifter, index) => (
                <li key={gifter.$id} className="flex items-center gap-4">
                  <span className="text-lg font-bold w-6">{index + 1}</span>
                  <Avatar>
                    {/* <AvatarImage src={gifter.avatar} /> */}
                    <AvatarFallback>
                      {gifter?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{gifter.username}</p>
                    <p className="text-sm text-foreground/70">
                      {gifter.giftCount} gifts sent
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold serif text-foreground">
          Most-Reacted Notes
        </h2>
        <p className="text-foreground/70">
          The most popular messages in the community.
        </p>
        <div className="mt-4">
          <MostReactedNotes />
        </div>
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold serif text-foreground">
          Trending Anonymous Posts
        </h2>
        <p className="text-foreground/70">
          The most popular anonymous messages in the last 24 hours.
        </p>
        <div className="mt-4">
          <TrendingAnonymousPosts />
        </div>
      </div>
    </div>
  );
}
