self.addEventListener("push", (event) => {
    console.log(event, event.data.json());
    const data = event.data.json();
    const title = data?.title;
    const description = data?.description;
    const tag = data?.id;

    const notificationOptions = {
        body: description,
        tag: tag,
    };

    console.log(notificationOptions);

    self.registration.showNotification(title, notificationOptions);
});