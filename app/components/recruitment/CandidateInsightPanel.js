"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

const tabs = ["Insight", "TimeLine", "Profile"];

function TabButton({ label, isActive, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex-1 border-b px-2 py-[8px] text-[14px] ${
                isActive
                    ? "border-secondary text-secondary"
                    : "border-black/10 text-black/25"
            }`}
        >
            {label}
        </button>
    );
}

function SkillTag({ children, className = "" }) {
    return (
        <span className={`rounded-full px-3 py-[3px] text-[12px] ${className}`}>
      {children}
    </span>
    );
}

function InfoRow({ icon, alt, children, isLink = false }) {
    return (
        <div className="flex items-center gap-2 text-[12px] text-black/65">
            <Image src={icon} alt={alt} width={12} height={12} />
            {isLink ? (
                <a href="#" className="text-[12px] text-[#2D64D8] underline-offset-2 hover:underline">
                    {children}
                </a>
            ) : (
                <span>{children}</span>
            )}
        </div>
    );
}

function ResumeRow({ icon, alt, fileName }) {
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
                <Image src={icon} alt={alt} width={16} height={16} />
                <span className="truncate text-[12px] text-black">{fileName}</span>
            </div>

            <div className="flex items-center gap-1">
                <button
                    type="button"
                    className="flex h-[18px] min-w-[44px] items-center justify-center rounded-[4px] border border-primary px-2 text-[11px] text-primary"
                >
                    Open
                </button>
                <button
                    type="button"
                    className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] bg-primary"
                >
                    <Image src="/icons/arrow2.png" alt="Download" width={10} height={10} />
                </button>
            </div>
        </div>
    );
}

function InsightTab({ candidate }) {
    const strongSkills = candidate.strongSkills || ["React", "node.js", "mongodb", "Docker"];
    const missingSkills = candidate.missingSkills || ["PostgreSQL"];

    return (
        <div className="px-[10px] pt-[10px]">
            <div className="mb-3 flex items-start gap-2">
                <Image
                    src={candidate.avatar}
                    alt={candidate.fullName}
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                />
                <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold leading-tight text-black">
                        {candidate.fullName}
                    </p>
                    <p className="truncate text-[12px] leading-tight text-black/80">
                        {candidate.position}
                    </p>
                </div>
            </div>

            <div className="mb-3 rounded-[12px] bg-[#F7F7F8] px-[10px] py-[12px]">
                <div className="mb-3 text-right text-[10px] text-black/35">
                    Analyze Date: {candidate.analyzeDate || "Jan 15, 2026"}
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex h-[72px] w-[72px] shrink-0 aspect-square items-center justify-center rounded-full border-[6px] border-[#20B77A]">
                        <div className="text-center leading-tight">
                            <div className="text-[15px] font-bold text-[#20B77A]">
                                {candidate.matchPercent}%
                            </div>
                            <div className="caption-text text-[10px] text-[#20B77A]">match</div>
                        </div>
                    </div>

                    <div className="min-w-0">
                        <p className="text-[14px] font-semibold leading-tight text-black">
                            {candidate.level ? `${candidate.level} ${candidate.position}` : candidate.position}
                        </p>

                        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#19B97A] px-3 py-[3px] text-[11px] text-white">
                            <Image src="/icons/check.png" alt="Proceed" width={10} height={10} />
                            <span>Status: Proceed</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <p className="mb-2 text-[14px] font-semibold text-black">Key skills</p>

                <div className="mb-2">
                    <div className="mb-1 flex items-center gap-1 text-[12px] text-[#21B77A]">
                        <span className="h-[8px] w-[8px] rounded-full bg-[#57D29C]" />
                        <span>Strong skills</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {strongSkills.map((skill, index) => {
                            const skillClasses = [
                                "bg-[#F0B8C1] text-[#A23949]",
                                "bg-[#C6CEF7] text-[#2D468C]",
                                "bg-[#E9DCA6] text-[#8E6D17]",
                                "bg-[#D7C7C7] text-[#6E5353]",
                            ];

                            return (
                                <SkillTag key={skill} className={skillClasses[index % skillClasses.length]}>
                                    {skill}
                                </SkillTag>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <div className="mb-1 flex items-center gap-1 text-[12px] text-[#E97B95]">
                        <span className="h-[8px] w-[8px] rounded-full bg-[#F08CA4]" />
                        <span>Missing skills</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {missingSkills.map((skill) => (
                            <SkillTag key={skill} className="bg-[#D7C7C7] text-[#6E5353]">
                                {skill}
                            </SkillTag>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-4 border-y border-black/10 py-3">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="mb-1 flex items-center gap-1 text-[12px] font-semibold text-black/65">
                            <Image src="/icons/suitcase.png" alt="Experience" width={12} height={12} />
                            <span>Experience</span>
                        </div>
                        <p className="text-[14px] text-black/80">{candidate.experience}</p>
                    </div>

                    <div>
                        <div className="mb-1 flex items-center gap-1 text-[12px] font-semibold text-black/65">
                            <Image src="/icons/lvl.png" alt="Level" width={12} height={12} />
                            <span>Level</span>
                        </div>
                        <p className="text-[14px] text-black/80">{candidate.level || "Middle"}</p>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <p className="mb-2 text-[14px] font-semibold text-black">
                    Comparison to job requirements
                </p>

                <div className="mb-2 flex items-center justify-between gap-2 text-[11px] text-black">
                    <span>Technical match: {candidate.technicalMatch || 85}%</span>
                    <span>Soft skills match: {candidate.softSkillsMatch || 95}%</span>
                </div>

                <div className="flex gap-3">
                    <div className="h-[8px] flex-1 rounded-full bg-[#DCEFE6]">
                        <div
                            className="h-[8px] rounded-full bg-[#19B97A]"
                            style={{ width: `${candidate.technicalMatch || 85}%` }}
                        />
                    </div>

                    <div className="h-[8px] flex-1 rounded-full bg-[#DCEFE6]">
                        <div
                            className="h-[8px] rounded-full bg-[#19B97A]"
                            style={{ width: `${candidate.softSkillsMatch || 95}%` }}
                        />
                    </div>
                </div>
            </div>

            <div>
                <p className="mb-2 text-[14px] font-semibold text-black">Summary</p>
                <p className="text-[12px] leading-[1.35] text-black/70">{candidate.summary}</p>
                <button type="button" className="mt-1 text-[12px] text-secondary">
                    Show more
                </button>
            </div>
        </div>
    );
}

function TimelineTab({ candidate }) {
    const timeline = candidate.timeline || [
        {
            id: "1",
            title: "Move",
            subtitle: "Moved to Screening",
            date: "Jan 15, 2026",
            color: "bg-[#22C55E]",
        },
        {
            id: "2",
            title: "AI Analysis",
            subtitle: "95% match",
            date: "Jan 15, 2026",
            color: "bg-secondary",
        },
        {
            id: "3",
            title: "Create",
            subtitle: "Candidate card created",
            date: "Jan 12, 2026",
            color: "bg-primary",
        },
    ];

    return (
        <div className="px-[10px] pt-[14px]">
            <h3 className="text-[16px] font-semibold text-black">Activity</h3>
            <p className="mb-4 text-[12px] text-black/25">Candidate history</p>

            <div className="rounded-[12px] bg-[#F7F7F8] px-4 py-4">
                <div className="relative">
                    <div className="absolute left-[4px] top-[6px] bottom-[6px] w-[1px] bg-black/10" />

                    <div className="space-y-5">
                        {timeline.map((item) => (
                            <div key={item.id} className="relative flex justify-between gap-3 pl-5">
                                <div
                                    className={`absolute left-0 top-[4px] h-[8px] w-[8px] rounded-full ${item.color}`}
                                />

                                <div className="min-w-0">
                                    <p
                                        className={`text-[14px] font-semibold ${
                                            item.title === "AI Analysis"
                                                ? "text-secondary"
                                                : item.title === "Move"
                                                    ? "text-[#22C55E]"
                                                    : "text-primary"
                                        }`}
                                    >
                                        {item.title}
                                    </p>
                                    <p className="text-[11px] text-black/60">{item.subtitle}</p>
                                </div>

                                <span className="shrink-0 text-[10px] text-black/35">{item.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileTab({ candidate }) {
    const resumeFiles = candidate.resumeFiles || [
        { id: "1", type: "pdf", fileName: "cv.pdf" },
        { id: "2", type: "doc", fileName: "cv.docx" },
    ];

    return (
        <div className="px-[10px] pt-[14px]">
            <h3 className="text-[16px] font-semibold text-black">Profile</h3>
            <p className="mb-4 text-[12px] text-black/25">Candidate information and documents</p>

            <div className="mb-4 rounded-[12px] bg-[#F7F7F8] p-3">
                <div className="mb-3 flex items-start gap-2">
                    <Image
                        src={candidate.avatar}
                        alt={candidate.fullName}
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                    />
                    <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold leading-tight text-black">
                            {candidate.fullName}
                        </p>
                        <p className="truncate text-[12px] leading-tight text-black/80">
                            {candidate.position}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <InfoRow icon="/icons/mail.png" alt="Email">
                        {candidate.email}
                    </InfoRow>

                    <InfoRow icon="/icons/telephone.png" alt="Phone">
                        {candidate.phone || "+380366952447"}
                    </InfoRow>

                    <InfoRow icon="/icons/in.png" alt="LinkedIn" isLink>
                        {candidate.linkedIn || "LinkedIn"}
                    </InfoRow>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 border-t border-black/10 pt-3">
                    <div className="flex items-center gap-2 text-[12px] text-black/70">
                        <span>Status:</span>
                        <span className="rounded-full bg-[#B6E8C8] px-2 py-[2px] text-[12px] text-[#208F55]">
              Screening
            </span>
                    </div>

                    <span className="text-[12px] font-semibold text-black">
            {candidate.salaryFrom || "from 800$"}
          </span>
                </div>
            </div>

            <div className="mb-4 rounded-[12px] bg-[#F7F7F8] p-3">
                <p className="mb-3 text-[14px] font-semibold text-black">CV / Resume</p>

                <div className="space-y-2">
                    {resumeFiles.map((file) => (
                        <ResumeRow
                            key={file.id}
                            icon={file.type === "pdf" ? "/icons/pdf.png" : "/icons/doc.png"}
                            alt={file.type.toUpperCase()}
                            fileName={file.fileName}
                        />
                    ))}
                </div>
            </div>

            <div className="rounded-[12px] bg-[#F7F7F8] p-3">
                <p className="mb-3 text-[14px] font-semibold text-black">HR Notes</p>

                <div className="rounded-[6px] border border-black/15 bg-white px-3 py-3 text-[12px] leading-[1.35] text-black/65">
                    {candidate.hrNotes ||
                        "Olga is a Middle Frontend Developer with 2+ years of experience and a strong 95% match for the vacancy."}
                </div>

                <div className="mt-2 text-right">
                    <button type="button" className="text-[12px] text-[#7C3AED]">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CandidateInsightPanel({ candidate, onClose }) {
    const [activeTab, setActiveTab] = useState("Insight");

    const content = useMemo(() => {
        if (!candidate) return null;

        if (activeTab === "TimeLine") {
            return <TimelineTab candidate={candidate} />;
        }

        if (activeTab === "Profile") {
            return <ProfileTab candidate={candidate} />;
        }

        return <InsightTab candidate={candidate} />;
    }, [activeTab, candidate]);

    if (!candidate) return null;

    return (
        <aside className="flex h-full min-h-0 w-[263px] shrink-0 flex-col bg-white xl:w-[300px] 2xl:w-[340px]">
            <div className="flex items-center justify-between border-b border-black/10 px-2">
                <div className="flex flex-1">
                    {tabs.map((tab) => (
                        <TabButton
                            key={tab}
                            label={tab}
                            isActive={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[18px] text-black/50 hover:bg-black/5"
                    aria-label="Close panel"
                >
                    ×
                </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">{content}</div>

            <div className="px-[10px] py-[10px]">
                <button className="flex h-[28px] w-full items-center justify-center gap-2 rounded-[3px] bg-[#C8B0F0] px-4 text-[12px] text-[#5E3E98]">
                    <Image src="/icons/ai.png" alt="AI" width={14} height={14} />
                    <span>Re-Analyze match</span>
                </button>
            </div>
        </aside>
    );
}