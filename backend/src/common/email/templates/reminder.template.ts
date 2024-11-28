export const reminderTemplate = (email: string, movieTitle: string, reminderTime: string) => ({
    text: `
      Hello,
  
      This is a reminder to watch "${movieTitle}" at ${reminderTime}.
      
      If you have any questions or feedback, feel free to contact us.
  
      Thank you,
      Team Izzy Watch
    `,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reminder</title>
          <style>
              body {
                  font-family: 'Montserrat', sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                  color: #333;
              }
              .container {
                  max-width: 600px;
                  margin: 30px auto;
                  background: #fff;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #054b99;
              }
              p {
                  font-size: 16px;
                  line-height: 1.5;
              }
              footer {
                  text-align: center;
                  margin-top: 20px;
                  color: #666;
                  font-size: 14px;
              }
              .btn {
                  display: inline-block;
                  padding: 10px 20px;
                  background: #054b99;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Reminder to Watch "${movieTitle}"</h1>
              <p>Hello,</p>
              <p>This is a gentle reminder to watch "${movieTitle}" at <strong>${reminderTime}</strong>.</p>
              <p>If you have any questions or feedback, feel free to reach out!</p>
              <footer>
                  <p>Thank you,</p>
                  <p>Team Izzy Watch</p>
              </footer>
          </div>
      </body>
      </html>
    `,
  });
  