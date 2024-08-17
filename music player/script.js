// Spotify API 인증 정보
const clientId = 'fed9a7651175499898f5b8b59a334adb';
const clientSecret = '8a97a5afe2d543dcb4827da290b0f2e8';

// API 엔드포인트
const authTokenUrl = 'https://accounts.spotify.com/api/token';
const searchUrl = 'https://api.spotify.com/v1/search';
const albumTracksUrl = 'https://api.spotify.com/v1/albums/';
const artistTopTracksUrl = 'https://api.spotify.com/v1/artists/';

// 전역 변수
let accessToken = '';
let hoverTimer = null;
let currentPreviewAudio = null;
let isPlaying = false;
let isMainTrackPlaying = false;
let autocompleteTimeout = null;

// Access Token을 가져오는 함수
async function getAccessToken() {
    const response = await fetch(authTokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials'
        })
    });

    const data = await response.json();
    accessToken = data.access_token;
}

// 음악을 검색하는 함수
async function searchMusic(query) {
    const response = await fetch(`${searchUrl}?q=${encodeURIComponent(query)}&type=track&limit=20`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data.tracks.items;
}

// 앨범의 전체 트랙을 가져오는 함수
async function getAlbumTracks(albumId) {
    const albumResponse = await fetch(`${albumTracksUrl}${albumId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const albumData = await albumResponse.json();

    const tracksResponse = await fetch(`${albumTracksUrl}${albumId}/tracks`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const tracksData = await tracksResponse.json();

    return tracksData.items.map(track => ({
        ...track,
        album: {
            id: albumData.id,
            name: albumData.name,
            images: albumData.images
        }
    }));
}

// 아티스트의 인기 트랙을 가져오는 함수
async function getArtistTopTracks(artistId) {
    const response = await fetch(`${artistTopTracksUrl}${artistId}/top-tracks?market=US`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data.tracks;
}

// 검색 결과를 표시하는 함수
function displayResults(tracks) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('result-item');
        trackElement.innerHTML = `
            <img src="${track.album.images[1]?.url || ''}" alt="Cover" class="preview">
            <div>
                <div>${track.name}</div>
                <div class="metadata artist-name" data-artist-id="${track.artists[0].id}">${track.artists[0].name}</div>
                <div class="metadata album-name" data-album-id="${track.album.id}">${track.album.name}</div>
            </div>
        `;
        
        trackElement.addEventListener('click', () => playTrack(track));
        
        // 호버링 시 미리듣기 재생
        trackElement.addEventListener('mouseenter', () => {
            if (!isMainTrackPlaying) {
                hoverTimer = setTimeout(() => {
                    if (currentPreviewAudio) {
                        currentPreviewAudio.pause();
                    }
                    currentPreviewAudio = new Audio(track.preview_url);
                    currentPreviewAudio.volume = audioPlayer.volume;
                    currentPreviewAudio.play();
                }, 500);
            }
        });
        
        trackElement.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
            if (currentPreviewAudio && !isMainTrackPlaying) {
                currentPreviewAudio.pause();
                currentPreviewAudio.currentTime = 0;
                currentPreviewAudio = null;
            }
        });
        
        const artistElement = trackElement.querySelector('.artist-name');
        artistElement.addEventListener('click', (e) => {
            e.stopPropagation();
            loadArtistTracks(e.target.dataset.artistId);
        });

        const albumElement = trackElement.querySelector('.album-name');
        albumElement.addEventListener('click', (e) => {
            e.stopPropagation();
            loadAlbumTracks(e.target.dataset.albumId);
        });
        
        resultsContainer.appendChild(trackElement);
    });
}

// 트랙을 재생하는 함수
function playTrack(track) {
    if (currentPreviewAudio) {
        currentPreviewAudio.pause();
        currentPreviewAudio.currentTime = 0;
        currentPreviewAudio = null;
    }

    const coverImage = document.getElementById('coverImage');
    coverImage.style.backgroundImage = `url(${track.album.images[0]?.url || ''})`;

    const trackInfo = document.getElementById('trackInfo');
    trackInfo.innerHTML = `
        <h2 id="trackTitle">${track.name}</h2>
        <p id="artistName" class="metadata" data-artist-id="${track.artists[0].id}">${track.artists[0].name}</p>
        <p id="albumName" class="metadata" data-album-id="${track.album.id}">${track.album.name}</p>
    `;

    document.getElementById('artistName').addEventListener('click', (e) => loadArtistTracks(e.target.dataset.artistId));
    document.getElementById('albumName').addEventListener('click', (e) => loadAlbumTracks(e.target.dataset.albumId));

    const audioPlayer = document.getElementById('audioPlayer');
    
    if (isMainTrackPlaying) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }

    audioPlayer.src = track.preview_url;
    audioPlayer.play();
    isPlaying = true;
    isMainTrackPlaying = true;
    updatePlayPauseButton();

    audioPlayer.addEventListener('timeupdate', updateProgressBar);

    audioPlayer.addEventListener('ended', () => {
        isMainTrackPlaying = false;
        isPlaying = false;
        updatePlayPauseButton();
    });

    getImageColor(track.album.images[0]?.url || '');
}

// 앨범의 전체 트랙을 불러오는 함수
async function loadAlbumTracks(albumId) {
    const tracks = await getAlbumTracks(albumId);
    displayResults(tracks);
}

// 아티스트의 인기 트랙을 불러오는 함수
async function loadArtistTracks(artistId) {
    const tracks = await getArtistTopTracks(artistId);
    displayResults(tracks);
}

// 프로그레스 바 업데이트 함수
function updateProgressBar() {
    const audioPlayer = document.getElementById('audioPlayer');
    const progress = document.getElementById('progress');
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${percentage}%`;
}

// 재생/일시정지 토글 함수
function togglePlay() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
    isMainTrackPlaying = isPlaying;
    updatePlayPauseButton();
}

// 재생/일시정지 버튼 업데이트 함수
function updatePlayPauseButton() {
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    if (isPlaying) {
        playButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    } else {
        playButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }
}

// 트랙 정지 함수
function stopTrack() {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    isMainTrackPlaying = false;
    updatePlayPauseButton();
}

// 색상의 명도를 계산하는 함수
function getLuminance(r, g, b) {
    let a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// 이미지 색상 추출 및 적용 함수
function getImageColor(imageUrl) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const rgba = imageData.data;
        let colorCounts = {};

        for (let i = 0; i < rgba.length; i += 4) {
            const red = rgba[i];
            const green = rgba[i + 1];
            const blue = rgba[i + 2];
            const alpha = rgba[i + 3];

            if (alpha < 255) continue;

            const color = `rgb(${red},${green},${blue})`;
            if (color in colorCounts) {
                colorCounts[color]++;
            } else {
                colorCounts[color] = 1;
            }
        }

        let dominantColor = Object.keys(colorCounts).reduce((a, b) => colorCounts[a] > colorCounts[b] ? a : b);
        
        const rgb = dominantColor.match(/\d+/g).map(Number);
        const luminance = getLuminance(rgb[0], rgb[1], rgb[2]);
        
        document.querySelector('.player').style.backgroundColor = dominantColor;
        
        const textColor = luminance > 0.5 ? '#000000' : '#ffffff';
        document.querySelector('.player').style.color = textColor;
        
        document.getElementById('trackTitle').style.color = textColor;
        document.getElementById('artistName').style.color = textColor;
        document.getElementById('albumName').style.color = textColor;
        
        const iconButtons = document.querySelectorAll('.icon-button');
        iconButtons.forEach(button => {
            button.style.color = textColor;
        });
        
        document.getElementById('progress').style.backgroundColor = textColor;
    }
}

// 볼륨 조절 함수
function setVolume(volume) {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.volume = volume;
    updateVolumeUI(volume);
}

// 볼륨 UI 업데이트 함수
function updateVolumeUI(volume) {
    const volumeSlider = document.getElementById('volumeSlider');
    const volumePercentage = document.getElementById('volumePercentage');
    volumeSlider.value = volume * 100;
    volumePercentage.textContent = Math.round(volume * 100) + '%';
}

// 자동완성 검색 함수
async function autocompleteSearch(query) {
    if (query.length < 2) return []; // 2글자 미만이면 검색하지 않음

    const response = await fetch(`${searchUrl}?q=${encodeURIComponent(query)}&type=track&limit=5`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data.tracks.items.map(track => ({
        name: track.name,
        artist: track.artists[0].name
    }));
}

// 자동완성 목록 표시 함수
function displayAutocomplete(results) {
    const autocompleteList = document.getElementById('autocompleteList');
    autocompleteList.innerHTML = '';

    if (results.length === 0) {
        autocompleteList.style.display = 'none';
        return;
    }

    results.forEach(result => {
        const li = document.createElement('li');
        li.classList.add('autocomplete-item');
        li.textContent = `${result.name} - ${result.artist}`;
        li.addEventListener('click', () => {
            document.getElementById('searchInput').value = `${result.name} ${result.artist}`;
            autocompleteList.style.display = 'none';
            searchMusic(`${result.name} ${result.artist}`).then(displayResults);
        });
        autocompleteList.appendChild(li);
    });

    autocompleteList.style.display = 'block';
}

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const volumeControl = document.getElementById('volumeControl');
    const volumeSlider = document.getElementById('volumeSlider');

    // 초기 볼륨 설정
    audioPlayer.volume = 0.5;
    updateVolumeUI(0.5);

    // 볼륨 슬라이더 이벤트
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        setVolume(volume);
    });

    // 볼륨 컨트롤 호버 이벤트
    volumeControl.addEventListener('mouseenter', () => {
        document.getElementById('volumeSliderContainer').style.display = 'block';
    });

    volumeControl.addEventListener('mouseleave', (e) => {
        // 마우스가 볼륨 컨트롤을 벗어났는지 확인
        if (!volumeControl.contains(e.relatedTarget)) {
            document.getElementById('volumeSliderContainer').style.display = 'none';
        }
    });

    document.getElementById('searchButton').addEventListener('click', async () => {
        const query = document.getElementById('searchInput').value;
        if (query) {
            const tracks = await searchMusic(query);
            displayResults(tracks);
        }
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const query = e.target.value;
        
        clearTimeout(autocompleteTimeout);
        
        autocompleteTimeout = setTimeout(async () => {
            const results = await autocompleteSearch(query);
            displayAutocomplete(results);
        }, 300); // 300ms 디바운스
    });

    document.getElementById('searchInput').addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const query = document.getElementById('searchInput').value;
            if (query) {
                const tracks = await searchMusic(query);
                displayResults(tracks);
            }
        }
    });

    document.getElementById('playButton').addEventListener('click', togglePlay);
    document.getElementById('pauseButton').addEventListener('click', togglePlay);
    document.getElementById('stopButton').addEventListener('click', stopTrack);

    document.getElementById('backButton').addEventListener('click', () => {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.currentTime -= 10;
    });

    document.getElementById('forwardButton').addEventListener('click', () => {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.currentTime += 10;
    });

    // 검색 입력 필드 외부 클릭 시 자동완성 목록 숨기기
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            document.getElementById('autocompleteList').style.display = 'none';
        }
    });
});

// 초기 상태 설정
updatePlayPauseButton();

// 페이지 로드 시 Access Token 가져오기
getAccessToken();