import { API } from './api.js';
import * as UI from './ui.js';

UI.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();

	//Read the form data
	const artistName = UI.artistInput.value,
		  songName = UI.songInput.value;

	//Validate form
	if(artistName === '' | songName === '') {
		UI.messageDiv.innerHTML = 'All fields are mandatory';
		UI.messageDiv.classList.add('error');
		setTimeout(() => {
			UI.messageDiv.innerHTML = '';
			UI.messageDiv.classList.remove('error');
		}, 3000);
	} else {
		//Query API
		const lyric = new API(artistName, songName);
		lyric.queryAPI()
			.then(data => {
				let result = data.lyric.lyrics;
				UI.resultDiv.textContent = result;
			});
	}
});