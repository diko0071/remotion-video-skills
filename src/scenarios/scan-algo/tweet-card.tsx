import React from "react";
import { Img, staticFile } from "remotion";

export type Tweet = {
  name: string;
  handle: string;
  avatar: string;
  time: string;
  text: React.ReactNode;
  replies: string;
  reposts: string;
  likes: string;
  views: string;
};

export const TWEETS: Tweet[] = [
  {
    name: "Marcus Reid",
    handle: "@marcusdoesseo",
    avatar: "slack/avatar-marcus.png",
    time: "2h",
    text: (
      <>
        Google rolled out a new core update last week. Our traffic is down{" "}
        <b>42% overnight</b>. Eight years of work.
      </>
    ),
    replies: "312",
    reposts: "1.4K",
    likes: "8.2K",
    views: "1.1M",
  },
  {
    name: "Sarah Lindqvist",
    handle: "@sarahsearch",
    avatar: "slack/avatar-sarah.png",
    time: "4h",
    text: (
      <>
        Checked Search Console this morning. Impressions fell off a cliff
        starting <b>Aug 12</b>. Anyone else seeing this?
      </>
    ),
    replies: "897",
    reposts: "2.1K",
    likes: "12.6K",
    views: "2.4M",
  },
  {
    name: "Priya Sharma",
    handle: "@priyaranks",
    avatar: "slack/avatar-priya.png",
    time: "6h",
    text: (
      <>
        This August update is the <b>most volatile</b> I have tracked in
        years. Entire niches are getting rewritten.
      </>
    ),
    replies: "441",
    reposts: "980",
    likes: "6.8K",
    views: "890K",
  },
  {
    name: "Diego Fuentes",
    handle: "@diegoseo",
    avatar: "slack/avatar-diego.png",
    time: "7h",
    text: (
      <>
        Client woke up to <b>-60% clicks</b>. No warning. No documentation.
        Nothing.
      </>
    ),
    replies: "265",
    reposts: "1.1K",
    likes: "9.4K",
    views: "1.6M",
  },
  {
    name: "Tom Okafor",
    handle: "@tomokafor",
    avatar: "slack/avatar-tom.png",
    time: "9h",
    text: <>every seo group chat i am in is on fire right now</>,
    replies: "1.2K",
    reposts: "4.6K",
    likes: "31K",
    views: "4.8M",
  },
  {
    name: "Nina Vasquez",
    handle: "@ninavsqz",
    avatar: "slack/avatar-nina.png",
    time: "11h",
    text: <>everything down</>,
    replies: "2.3K",
    reposts: "7.8K",
    likes: "41K",
    views: "7.2M",
  },
];

const Metric: React.FC<{ d: string; label: string }> = ({ d, label }) => (
  <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.8">
      <path d={d} />
    </svg>
    {label}
  </span>
);

export const TweetCard: React.FC<{ tweet: Tweet }> = ({ tweet }) => (
  <div
    style={{
      width: 860,
      background: "#ffffff",
      borderRadius: 16,
      border: "1px solid #e5e2da",
      boxShadow: "0 18px 50px rgba(23,19,16,0.10)",
      padding: "26px 30px 20px",
      fontFamily: "inherit",
      color: "#0f1419",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <Img
        src={staticFile(tweet.avatar)}
        style={{ width: 52, height: 52, borderRadius: 999, objectFit: "cover" }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 22, fontWeight: 700 }}>
          {tweet.name}
          <svg width="21" height="21" viewBox="0 0 22 22" fill="#1d9bf0">
            <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
          </svg>
          <span style={{ color: "#536471", fontWeight: 400, fontSize: 20 }}>
            {tweet.handle} · {tweet.time}
          </span>
        </div>
      </div>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#0f1419">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </div>
    <div style={{ fontSize: 26, lineHeight: 1.42, marginTop: 16, letterSpacing: -0.2 }}>
      {tweet.text}
    </div>
    <div
      style={{
        display: "flex",
        gap: 54,
        marginTop: 20,
        paddingTop: 16,
        borderTop: "1px solid #eff3f4",
        color: "#536471",
        fontSize: 18,
      }}
    >
      <Metric d="M9 17H7a5 5 0 0 1 0-10h2m6 0h2a5 5 0 0 1 0 10h-2M8 12h8" label={tweet.replies} />
      <Metric d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4m14-3v2a4 4 0 0 1-4 4H3" label={tweet.reposts} />
      <Metric d="M20.8 4.6c-1.9-1.9-5-1.9-6.9 0L12 6.5l-1.9-1.9c-1.9-1.9-5-1.9-6.9 0s-1.9 5 0 6.9l8.8 8.8 8.8-8.8c1.9-1.9 1.9-5 0-6.9z" label={tweet.likes} />
      <Metric d="M4 20V10m6 10V4m6 16v-7" label={tweet.views} />
    </div>
  </div>
);
