export const forgotPasswordTemplate = (
  email: string,
  resetPassword: string,
) => ({
  text: `
    
      <p>Hey, hey<p/>
      
      <p>Hello,<p/>
      <p>Follow this link to reset your Tradelenda Account password for your adekanmiisrael8@gmail.com account.<p/>
    
    
      
    
      Keep your eyes peeled to  your inbox because we’ve got a lot more coming your way. 
      
      Thanks, and let us know what you think of the app. We love your feedback and we will always respond!
    
      Team Trade Lenda
     
    
        `,
  html: `
      <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Loan Request</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
        
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300&display=swap"
                rel="stylesheet">
            <style>
                * {
                    box-sizing: border-box;
                    font-family: "Montserrat", sans-serif;
                }
        
                body {
                    margin: 0;
                }
        
                a {
                    text-decoration: none;
                    color: unset;
                    cursor: pointer;
                }
        
                .primary-btn {
                    background: #054b99;
                    color: #FFF;
                    border-radius: 12px;
                    border: 1px solid #054b99;
                }
        
                .primary-btn:hover {
                    background: #376fad;
                    color: #FFF;
                    border: 1px solid #376fad;
                }
        
                .primary-btn:focus {
                    background: #054b99;
                    color: #FFF;
                    border: 1px solid #054b99;
                }
        
                .container {
                    max-width: 650px;
                    width: 90%;
                    margin: auto;
                }
                header {
                    margin: 36px 0 30px;
                }
                h1 {
                    font-size: 28px;
                    font-weight: 500;
                    line-height: 42px;
                    letter-spacing: 0.4000000059604645px;
                }
        
                h5 {
                    font-size: 17px;
                    font-weight: 600;
                    line-height: 28px;
                    letter-spacing: 0px;
                    margin: 20px 0;
                }
                p {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 21px;
                }
                p span {
                    font-weight: 700;
                }
                .primary-btn {
                    margin: 30px 0 40px;
                    padding: 10px 18px;
                }
                .name {
                    color: #7C8293;
                    margin-bottom: 6px;
                }
                h6 {
                    color: #091540;
                    font-size: 14px;
                    margin-bottom: 30px;
                }
                footer {
                    background-color: #161A1E;
                    padding: 25px 20px;
                }
                footer hr {
                    border-color: white;
                    margin: 20px 0;
                }
                .socials {
                    text-align: center;
                }
                .socials a { 
                    margin-right: 26px;
                }
                .lower-footer {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    gap: 14px;
                }
                .lower-footer a {
                    color: #FFF;
                    font-size: 14px;
                }
                .icon {
                    width: 150px;
                    height: auto;
                    margin-right: 10px;
                  }
                @media (max-width: 500px) {
                    h1 {
                        font-size: 22px;
                    }
                } 
            </style>
        </head>
        
        <body>
            <div class="container">
            <header>
      
            
              <hr style="border-color: #cbcbcb;">
          </header>
                <main>
                    <p>Hello,<p/>
                        <p> Account password for your <span>${email}</span> account.<p/>
                      
                    <p>Here is your reset password <span>${resetPassword}</span></p>
                    <p>If you didn’t ask to reset your password, you can ignore this email.</p>
                   
                    
                    <p>Thank You</p>
      
                    <div>
                        <h6>Izzy Watch</h6>
                    </div>
                </main>
                <footer>
                <div class="socials">
                    <a href="https://www.facebook.com/fresh-from-farm">
                        <img src="https://res.cloudinary.com/freshfromfarm/image/upload/v1721582634/f3-client/icons/social/facebook_1_t766bg_k5hhgz.png" alt="Facebook">
                    </a>
                    <a href="https://twitter.com/fresh-from-farm">
                        <img src="https://res.cloudinary.com/freshfromfarm/image/upload/v1721582643/f3-client/icons/social/twitter_1_ivjcp2_ccod2w.png" alt="Twitter">
                    </a>
                    <a href="https://instagram.com/fresh-from-farm">
                        <img src="https://res.cloudinary.com/freshfromfarm/image/upload/v1721582636/f3-client/icons/social/instagram_1_tpfp6r_xoaftc.png" alt="Instagram">
                    </a>
                    <a href="https://www.linkedin.com/company/fresh-from-farm">
                        <img src="https://res.cloudinary.com/freshfromfarm/image/upload/v1721582639/f3-client/icons/social/linkedin_m7ndhf_nztmzo.png" alt="linkedin">
                    </a>
                </div>
            </footer>
            </div>
        </body>
        
        </html>
              `,
});
