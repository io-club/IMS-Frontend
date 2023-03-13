import Image from 'next/image'

export default function UserProfileCapsule() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image
                src={'/mdi/check_circle_outline.svg'}
                alt={'success icon'}
                width={30}
                height={30}
                style={{ opacity: 0.4 }}
            />
            <div style={{ margin: '0 5px 0 8px', whiteSpace: 'nowrap' }}>
                你好 User
            </div>
        </div>
    )
}
