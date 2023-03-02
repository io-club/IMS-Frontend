import { CSSProperties } from 'react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    let contentBlockStyle = {
        '--contentBlockHeight': '100vh',
        '--contentBlockWidth': '100vw',
    } as CSSProperties
    return (
        <html>
            <head>
                <title>鱼网 FishNet</title>
            </head>
            <body
                style={{
                    backgroundColor: 'rgb(243, 242, 246)',
                    height: '100vh',
                }}
            >
                <div style={contentBlockStyle}>{children}</div>
            </body>
        </html>
    )
}
