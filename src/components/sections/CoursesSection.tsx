import Section from "@/components/Section";
import Badge from "@/components/Badge";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { COURSES } from "@/data/courses";
import { getCourseSchema } from "@/lib/schema";

export default function CoursesSection() {
  return (
    <Section id="courses" eyebrow="Teaching" title="Courses" tone="blue">
      <div className="flex flex-col gap-16">
        {COURSES.map((course) => (
          <article
            key={course.id}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
          >
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(getCourseSchema(course)),
              }}
            />
            <YouTubeEmbed
              videoId={course.featuredVideoId}
              title={course.featuredVideoTitle}
            />

            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-fg">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {[
                    course.level,
                    course.language,
                    course.lessonCount && `${course.lessonCount} lessons`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>

              <p className="text-body">{course.description}</p>

              <div className="flex flex-wrap gap-2">
                {course.topics.map((topic) => (
                  <Badge key={topic}>{topic}</Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={course.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>Watch the full playlist</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={course.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <span>YouTube channel</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
