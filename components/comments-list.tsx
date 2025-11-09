import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface Comment {
  id: string
  author_name: string
  content: string
  rating: number
  created_at: string
}

interface CommentsListProps {
  comments: Comment[]
}

export function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id} className="border-border/50">
          <CardContent className="pt-6 pb-6 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="font-semibold text-foreground">{comment.author_name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.created_at).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Sparkles
                    key={i}
                    className={`h-4 w-4 ${
                      i < comment.rating ? "text-primary fill-primary" : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
