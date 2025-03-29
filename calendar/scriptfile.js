const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

function generateCalendar() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = i;
        dayDiv.addEventListener('click', () => selectDate(i));
        calendar.appendChild(dayDiv);
    }
}

function selectDate(day) {
    document.querySelectorAll('.day').forEach(dayDiv => {
        dayDiv.classList.remove('selected');
    });
    const selectedDay = document.querySelector(`.day:nth-child(${day})`);
    selectedDay.classList.add('selected');
    document.getElementById('eventDate').value = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    displayEvents(day);
}

function displayEvents(day) {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    eventsDiv.innerHTML = `<h2>Events on ${date}</h2>`;
    if (events[date]) {
        events[date].forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.textContent = event;
            eventsDiv.appendChild(eventDiv);
        });
    } else {
        eventsDiv.innerHTML += '<p>No events</p>';
    }
}

eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('eventDate').value;
    const description = document.getElementById('eventDescription').value;
    if (!events[date]) {
        events[date] = [];
    }
    events[date].push(description);
    displayEvents(new Date(date).getDate());
    eventForm.reset();
});

generateCalendar();

const toggleDarkModeButton = document.getElementById('toggleDarkMode');
toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
searchInput.style.borderRadius = '5px';
document.body.insertBefore(searchInput, calendar);

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const eventDivs = eventsDiv.querySelectorAll('div');
    eventDivs.forEach(eventDiv => {
        if (eventDiv.textContent.toLowerCase().includes(query)) {
            eventDiv.style.display = 'block';
        } else {
            eventDiv.style.display = 'none';
        }
    });
});

const { ChatContainer, MessageList, Message, MessageInput } = window.Chatscope;

class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    handleSend = (message) => {
        this.setState(prevState => ({
            messages: [...prevState.messages, { text: message, direction: 'outgoing' }]
        }));
        // Simulate a response from ChatGPT
        setTimeout(() => {
            this.setState(prevState => ({
                messages: [...prevState.messages, { text: "This is a response from ChatGPT", direction: 'incoming' }]
            }));
        }, 1000);
    }

    render() {
        return (
            <ChatContainer>
                <MessageList>
                    {this.state.messages.map((msg, index) => (
                        <Message key={index} model={{ message: msg.text, direction: msg.direction }} />
                    ))}
                </MessageList>
                <MessageInput placeholder="Type a message..." onSend={this.handleSend} />
            </ChatContainer>
        );
    }
}

ReactDOM.render(<ChatApp />, document.getElementById('chat-container'));

const weatherContainer = document.createElement('div');
weatherContainer.style.maxWidth = '600px';
weatherContainer.style.margin = '20px auto';
weatherContainer.style.backgroundColor = '#fff';
weatherContainer.style.padding = '20px';
weatherContainer.style.borderRadius = '5px';
weatherContainer.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
weatherContainer.innerHTML = '<h2>Weather Forecast</h2><p>Loading...</p>';
document.body.insertBefore(weatherContainer, document.getElementById('chat-container'));

async function fetchWeather() {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=YOUR_API_KEY&units=metric');
        const data = await response.json();
        weatherContainer.innerHTML = `
            <h2>Weather Forecast</h2>
            <p>Location: ${data.name}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        weatherContainer.innerHTML = '<h2>Weather Forecast</h2><p>Failed to load weather data.</p>';
    }
}

fetchWeather();

const sidebar = document.createElement('div');
sidebar.style.position = 'fixed';
sidebar.style.top = '100px';
sidebar.style.right = '20px';
sidebar.style.width = '200px';
sidebar.style.backgroundColor = '#fff';
sidebar.style.padding = '20px';
sidebar.style.borderRadius = '5px';
sidebar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
sidebar.innerHTML = `
    <h2>Sidebar</h2>
    <p>Additional functionality can be added here.</p>
`;
document.body.appendChild(sidebar);

const darkModeStyles = `
    body.dark-mode #sidebar {
        background-color: #444;
        color: #f4f4f9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = darkModeStyles;
document.head.appendChild(styleSheet);