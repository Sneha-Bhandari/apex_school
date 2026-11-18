import React from "react";
import { apiGet } from "@/lib/api";

const getImageUrl = (image) => {
  if (!image) return null;
  if (typeof image === "string") return image;
  return image.url || image.imageUrl || null;
};

const SocialIcon = ({ type }) => {
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.8-.1-1.7-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.4H7.2v3.1h2.7v8h3.5Z" />
      </svg>
    );
  }

  if (type === "twitter") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-6.5L6.2 22H3l7.3-8.4L2.5 2h6.4l4.5 6L18.9 2Zm-1.1 18h1.7L7.9 3.9H6.1L17.8 20Z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.4 3H3.6c-.9 0-1.6.7-1.6 1.6v14.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V4.6c0-.9-.7-1.6-1.6-1.6ZM8.1 18H5V9h3.1v9ZM6.5 7.8c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8ZM19 18h-3.1v-4.4c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4V18H9.6V9h3v1.2h.1c.4-.7 1.4-1.5 2.9-1.5 3.1 0 3.6 2 3.6 4.6V18Z" />
      </svg>
    );
  }

  return null;
};

const Team = async () => {
  let teamMembers = [];

  try {
    const response = await apiGet("/teams?order=DESC&page=1&take=10&deleted=none");
    teamMembers = Array.isArray(response) ? response : response?.data || [];
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return null;
  }

  const priority = {
    Principal: 1,
    "Vice Principal": 2,
  };

  teamMembers = [...teamMembers].sort((a, b) => {
    const positionA = priority[a.position || a.teamType?.name] || 3;
    const positionB = priority[b.position || b.teamType?.name] || 3;
    return positionA - positionB;
  });

  if (!teamMembers.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] py-10 md:py-10">
      <div className="relative mx-auto w-11/12">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-block rounded-full bg-red-50 px-5 py-2 text-sm tracking-wide text-[#f04450]">
            THE PEOPLE BEHIND OUR SUCCESS
          </span>

          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-gray-900 ">
            Meet Our <span className="text-[#f04450]">Team</span>
          </h2>

          <p className="mt-5 text-base text-gray-600 sm:text-sm">
            Get to know the leaders and faculty members of our school who inspire, guide, and shape the future of our students.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {teamMembers.map((member) => {
            const fullName = [member.firstName, member.lastName].filter(Boolean).join(" ");
            const image = getImageUrl(member.profileImage);
            const position = member.position || member.teamType?.name || "Team Member";

            const socialLinks = [
              {
                name: "Facebook",
                type: "facebook",
                url: member.facebookUrl,
              },
              {
                name: "Twitter",
                type: "twitter",
                url: member.twitterUrl,
              },
              {
                name: "LinkedIn",
                type: "linkedin",
                url: member.linkedinUrl,
              },
            ].filter((social) => social.url && /^https?:\/\//i.test(social.url));

            return (
              <article
                key={member.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl p-8"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="shrink-0">
                    <div className="h-26 w-26 overflow-hidden rounded-full border-4 border-white shadow-md ring-2 ring-red-100 sm:h-24 sm:w-24">
                      {image ? (
                        <img
                          src={image}
                          alt={fullName}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-4xl font-bold text-gray-400">
                          {fullName.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{fullName}</h3>

                    <p className="text-sm text-red-400">{position}</p>

                    {socialLinks.length > 0 && (
                      <div className="mt-4 flex items-center gap-3">
                        {socialLinks.map((social) => (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${fullName} ${social.name}`}
                            className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-[#25215f] hover:text-white"
                          >
                            <SocialIcon type={social.type} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {member.shortDescription && (
                  <div
                    className="pt-6 text-justify text-[12px] leading-6 text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: member.shortDescription,
                    }}
                  />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;