using Bennetr.BrickInv.Api.Options;
using Microsoft.Extensions.Options;

namespace Bennetr.BrickInv.Api.Services.Email;

public class HtmlEmailGenerator(IOptions<AppOptions> options) : IHtmlEmailGenerator
{
    private readonly AppOptions _options = options.Value;

    public string Generate(string body, string footerAdditions)
    {
        return $$"""
                 <!doctype html>
                 <html lang="en">
                 <head>
                   <meta charset="UTF-8"/>
                   <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
                   <style>
                     html, body {
                       color-scheme: dark;

                       margin: 0;
                       padding: 0;
                     }

                     html {
                       font-family: Inter, sans-serif;
                       font-size: 16px;
                       line-height: 20px;
                     }

                     .center {
                       display: flex;
                       justify-content: center;
                     }

                     .main-container {
                       width: min(100%, 700px);
                     }

                     .header {
                       height: 48px;
                       padding: 16px;

                       display: flex;
                       justify-content: space-between;
                       align-items: center;

                       background: #354566;
                       color: #ffffff;
                       font-size: 40px;
                     }

                     .header img {
                       height: 100%
                     }

                     .content {
                       min-height: 400px;
                       padding: 16px;
                     }

                     .button {
                       padding: 8px 16px 8px 16px;
                       border-radius: 6px;

                       background: #354566;
                       color: #ffffff;
                       text-decoration: none;
                       cursor: pointer;
                     }

                     .text-big {
                       font-size: 40px;
                     }

                     .footer {
                       padding: 16px;
                       background: #222d42;
                     }

                     .footer > p:first-of-type {
                       margin-top: 0;
                     }

                     .footer > p:last-of-type {
                       margin-bottom: 0;
                     }

                     .footer-imprint {
                       display: flex;
                       justify-content: space-between;
                     }
                   </style>
                 </head>
                 <body>
                   <div class="center">
                     <div class="main-container">
                       <div class="header">
                         <span>
                           BrickInv
                         </span>

                         <img src="{{_options.AppBaseUrl}}/brickinv.png" alt="BrickInv Logo">
                       </div>

                       <div class="content">
                         {{body}}
                       </div>

                       <div class="footer">
                         {{footerAdditions}}

                         <p>
                           This email was sent automatically. Please do not reply.<br>
                           <span class="footer-imprint">
                             <span>&#169; 2024 bennetr / BrickInv</span> <a href="{{_options.ImprintUrl}}">Imprint</a>
                           </span>
                         </p>
                       </div>
                     </div>
                   </div>
                 </body>
                 </html>
                 """;
    }
}
