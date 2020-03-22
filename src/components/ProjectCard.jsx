import React from 'react'

export default function ProjectCard(props)
{
    const { title, image, description, tags } = props.project

    const hashtags = (tags) =>
        (
            tags.map((tag, index) => (
                <span key={index} className="hashtag">{tag}</span>
            ))
        )

    return (
        <div className="project-card">
            <img className="w-full h-48 object-cover object-left-top" src={image} alt="Yaywalker" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base text-justify">
                    {description}
                </p>
            </div>
            <div className="px-6 py-4">
                {hashtags(tags)}
            </div>
        </div>
    )
}
