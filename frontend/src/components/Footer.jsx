//component for rendering footer

const Footer = () => {
  //style for footer
  const FooterStyle = {
    backgroundColor: '#0077B6',
    padding: 25,
    paddingRight: 50,
    textAlign: 'right',
    color: 'white',
    width: '100%',
  }

  //render footer
  return (
    <div style={FooterStyle}>
      <div>made by antti</div>
    </div>
  )
}

// exports
export default Footer
