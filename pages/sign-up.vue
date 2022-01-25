<template>
    <article
        class='p-3 grid'
    >
        <div
            class='max-w-[1800px] w-full grid lg:grid-flow-col lg:grid-cols-[auto,1fr] lg:pl-12 lg:pr-3 lg:gap-x-10 mx-auto'
        >
            <div class='pt-16 pb-12 md:pt-20 md:pb-18'>
            <FormSignUp
                class='max-w-[550px] flex-1 lg:mr-3 w-full'
                sign-in-link='/sign-in'
            />
        </div>

        <div
            class='hidden lg:block h-[calc(100vh-0.5rem)] w-full overflow-y-hidden rounded-lg isolate sticky top-1'
        >
            <div
            class='max-h-screen overflow-y-hidden grid items-center w-full aspect-w-3 aspect-h-4'
        >
            <Img
                src='http://res.cloudinary.com/prd-online-store/image/upload/v1631231314/media/Campaign/Welcome%20To%20Paradice/Location%20Shoot/header_omtl3f.jpg'
                class='h-full w-full object-cover object-center brightness-75'
            />
        </div>
        </div>
        </div>
    </article>    
</template>