module.exports = (markup, helmet) => {
	return `
    <!DOCTYPE html>
    <html lang="en" ${helmet.htmlAttributes.toString()}>

    <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link rel="icon" type="image/png" href="https://img.icons8.com/nolan/50/google-blog-search.png" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
        <script type="text/javascript" src="/dist/bundle.js"></script>
    </body>
    </html>
    `;
};
