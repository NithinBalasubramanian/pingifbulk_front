import React from 'react'

const Footer = () => {
  const date = new Date()

  const Year = date.getFullYear()

  return (
        <div className="footer_disp">
            <div className="container">
                <p className="copyright"> &copy; - 2020 - { Year } - All right reserved</p>
            </div>
        </div>
  )
}

export default Footer
