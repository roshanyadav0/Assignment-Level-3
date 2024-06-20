const fetchAdditionalQuestions = async (topic) => {
    const apiEndpoint = `https://example.com/api/questions?topic=${topic}`;
    try {
        const response = await fetch(apiEndpoint);
        if (response.ok) {
            const data = await response.json();
            return data.questions; // Assuming API returns a { questions: [...] } structure
        } else {
            console.error('Failed to fetch additional questions');
            return [];
        }
        } catch (error) {
        console.error('Error fetching additional questions', error);
        return [];
        }
    };
    
export default fetchAdditionalQuestions;
