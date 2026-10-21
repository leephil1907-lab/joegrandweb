"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ClipboardCheck, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { trainingCatalog } from "@/content/site-content";

const formats = [
  { id: "Private team session", label: "Private team" },
  { id: "On-site workshop", label: "On-site workshop" },
  { id: "Public-class interest", label: "Public class" },
  { id: "Talk or custom session", label: "Talk / custom" },
] as const;

const groupSizes = ["1–10 people", "11–25 people", "26–50 people", "50+ people"] as const;
const requestTypes = ["Dates and availability", "Custom quote", "Course fit call", "Speaking / event request"] as const;
type CourseSlug = (typeof trainingCatalog)[number]["slug"];

export default function TrainingRequestBuilder() {
  const searchParams = useSearchParams();
  const requestedCourseSlug = searchParams.get("course");
  const [courseSlug, setCourseSlug] = useState<CourseSlug>(trainingCatalog[0].slug);
  const [format, setFormat] = useState<(typeof formats)[number]["id"]>(formats[0].id);
  const [groupSize, setGroupSize] = useState<(typeof groupSizes)[number]>(groupSizes[0]);
  const [requestType, setRequestType] = useState<(typeof requestTypes)[number]>(requestTypes[0]);

  const course = useMemo(() => trainingCatalog.find((item) => item.slug === courseSlug) || trainingCatalog[0], [courseSlug]);
  const contactHref = `/contact?topic=Training&course=${encodeURIComponent(course.title)}&format=${encodeURIComponent(format)}&group=${encodeURIComponent(groupSize)}&request=${encodeURIComponent(requestType)}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("joegrand-training-request");
      if (!saved) return;
      const draft = JSON.parse(saved) as { courseSlug?: string; format?: string; groupSize?: string; requestType?: string };
      if (draft.courseSlug && trainingCatalog.some((item) => item.slug === draft.courseSlug)) setCourseSlug(draft.courseSlug as CourseSlug);
      if (draft.format && formats.some((item) => item.id === draft.format)) setFormat(draft.format as (typeof formats)[number]["id"]);
      if (draft.groupSize && groupSizes.includes(draft.groupSize as (typeof groupSizes)[number])) setGroupSize(draft.groupSize as (typeof groupSizes)[number]);
      if (draft.requestType && requestTypes.includes(draft.requestType as (typeof requestTypes)[number])) setRequestType(draft.requestType as (typeof requestTypes)[number]);
    } catch { /* A saved planner draft is optional. */ }
  }, []);

  useEffect(() => {
    if (requestedCourseSlug && trainingCatalog.some((item) => item.slug === requestedCourseSlug)) setCourseSlug(requestedCourseSlug as CourseSlug);
  }, [requestedCourseSlug]);

  useEffect(() => {
    try { localStorage.setItem("joegrand-training-request", JSON.stringify({ courseSlug, format, groupSize, requestType })); } catch { /* A saved planner draft is optional. */ }
  }, [courseSlug, format, groupSize, requestType]);

  return (
    <section className="punk-booking-section" aria-labelledby="training-planner-title">
      <div className="container">
        <div className="punk-section-head compact">
          <div><p className="punk-kicker">TRAINING REQUEST BUILDER / SAVED LOCALLY</p><h2 id="training-planner-title">Plan the<br /><em>right session.</em></h2></div>
          <p>Build a concise training brief, keep it in this browser, and send the details directly to the in-site contact route when you are ready.</p>
        </div>
        <div className="punk-booking-grid">
          <div className="punk-booking-builder">
            <p className="punk-kicker">01 / CONFIGURE</p>
            <h2>Set your brief.</h2>
            <label htmlFor="training-course">Training path</label>
            <select id="training-course" value={courseSlug} onChange={(event) => setCourseSlug(event.target.value as CourseSlug)}>{trainingCatalog.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}</select>
            <fieldset><legend>Format</legend><div className="punk-booking-options">{formats.map((item) => <button type="button" key={item.id} aria-pressed={format === item.id} onClick={() => setFormat(item.id)}>{item.label}</button>)}</div></fieldset>
            <fieldset><legend><Users size={13} /> Group size</legend><div className="punk-booking-options">{groupSizes.map((item) => <button type="button" key={item} aria-pressed={groupSize === item} onClick={() => setGroupSize(item)}>{item}</button>)}</div></fieldset>
            <fieldset><legend>What do you need?</legend><div className="punk-booking-options">{requestTypes.map((item) => <button type="button" key={item} aria-pressed={requestType === item} onClick={() => setRequestType(item)}>{item}</button>)}</div></fieldset>
          </div>
          <aside className="punk-booking-summary" aria-label="Training request summary">
            <p className="punk-kicker">02 / REQUEST SUMMARY</p>
            <h2>Ready to<br /><em>start.</em></h2>
            <p>Your choices are saved only in this browser until you open the contact route. No booking or payment is taken at this stage.</p>
            <div className="punk-booking-brief"><div><span>Course</span><strong>{course.title}</strong></div><div><span>Format</span><strong>{format}</strong></div><div><span>Group</span><strong>{groupSize}</strong></div><div><span>Request</span><strong>{requestType}</strong></div></div>
            <Link className="punk-button is-yellow" href={contactHref}><ClipboardCheck size={16} /> Request dates &amp; pricing <ArrowRight size={15} /></Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
