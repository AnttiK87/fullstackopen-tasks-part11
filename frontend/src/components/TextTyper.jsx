import React, { useState, useEffect } from 'react'

function TextTyper() {
  const styleText = {
    marginTop: 50,
    marginLeft: 30,
    maxWidth: '80%',
    textAlign: 'justify',
  }

  const [text, setText] = useState('')
  const fullText =
    'A blog application enables users to create, view, like, and comment on blog posts. Logged-in users can manage their own posts while also engaging with content shared by others. The application presents a list of blog entries, organized by popularity (determined by the number of likes). Each blog post features a title, author, a link to the original blog, and a dedicated section for user comments.'
  const typingSpeed = 20

  useEffect(() => {
    let index = 0

    const typingInterval = setInterval(() => {
      if (index < fullText.length - 1) {
        setText((prev) => prev + fullText[index])
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [fullText]) // Lisätty fullText riippuvuus

  return <p style={styleText}>{text}</p>
}

export default TextTyper
