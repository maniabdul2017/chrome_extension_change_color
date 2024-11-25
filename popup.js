
async function changeColor() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
        const textColor = document.getElementById("textColor").value;
        const bgColor = document.getElementById("bgColor").value;

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (textColor, bgColor) => {
                const body = document.body;

                // Change the text color
                const allTextElements = document.querySelectorAll('*');
                allTextElements.forEach((element) => {
                    element.style.setProperty("color", textColor, "important");
                });

                // Change the background color
                body.style.setProperty("background-color", bgColor, "important");

                // Apply selection style
                const style = document.createElement('style');
                style.textContent = `
                    ::selection {
                        background: ${bgColor};
                        color: ${textColor};
                    }
                `;
                document.head.appendChild(style);
            },
            args: [textColor, bgColor]
        });
    } else {
        console.error("No active tab found or tab ID is missing.");
    }
}

// Automatically apply colors when the user picks them
document.getElementById("textColor").addEventListener("input", changeColor);
document.getElementById("bgColor").addEventListener("input", changeColor);


document.getElementById("applyColors").addEventListener("click", changeColor);

// async function changeColor() {
//     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//     if (tab?.id) {
//
//         const textColor = document.getElementById("textColor").value;
//         const bgColor = document.getElementById("bgColor").value;
//
//
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             func: (textColor, bgColor) => {
//                 const body = document.body;
//
//
//                 const allTextElements = document.querySelectorAll('*');
//
//                 allTextElements.forEach((element) => {
//
//                     element.style.setProperty("color", textColor, "important");
//                 });
//
//
//                 body.style.setProperty("background-color", bgColor, "important");
//
//
//                 const style = document.createElement('style');
//                 style.textContent = `
//                     ::selection {
//                         background: ${bgColor};
//                         color: ${textColor};
//                     }
//                 `;
//                 document.head.appendChild(style);
//             },
//             args: [textColor, bgColor]
//         });
//     } else {
//         console.error("No active tab found or tab ID is missing.");
//     }
// }
//
// document.getElementById("applyColors").addEventListener("click", changeColor);
