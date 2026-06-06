AOS.init()
var tempMusic = ''
music = document.getElementById('music')
if (tempMusic) {
    music.src = tempMusic
}
function mulai() {
    document.querySelectorAll('.nama-pengantin').forEach(el => {
        el.style.opacity = '0';
        el.style.transform += ' translateY(-100px)';
    });
    window.scrollTo(0, 0);

    var ampSection = $('#amp-section');

    document.querySelector('.amp.atas')
        .style.transform = 'translateY(-100%)';

    document.querySelector('.amp.bawah')
        .style.transform = 'translateY(100%)';

    setTimeout(function () {
        music.play();
    }, 200);

    setTimeout(function () {
        ampSection.fadeOut();
        $('body').removeClass('overflow-hidden');
    }, 1500);
}

// button music
var isPlaying = true;
function toggleMusic(event) {
    event.preventDefault();

    const musicBotton = document.getElementById('music-button');
    if (isPlaying) {
        musicBotton.innerHTML = '<i class="fa fa-fw fa-pause"></i>';
        musicBotton.classList.remove('rotate')
        musicBotton.style.transform = 'translateY(0)'
        music.pause();
    } else {
        musicBotton.innerHTML = '<i class="fa fa-fw fa-compact-disc"></i>';
        musicBotton.classList.add('rotate');
        music.play();
    }
    isPlaying = !isPlaying;
}

// contdown dating
var countDownDate = new Date("June 26,2026 18:00:00").getTime();
var x = setInterval(function () {
    var now = new Date().getTime();

    var distance = countDownDate - now

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown-wedding").innerHTML = `
<div class="col-auto">
    <div class="countdown-item">
        <h5>${days}</h5>
        <span>Hari</span>
    </div>
</div>

<div class="col-auto">
    <div class="countdown-item">
        <h5>${hours}</h5>
        <span>Jam</span>
    </div>
</div>

<div class="col-auto">
    <div class="countdown-item">
        <h5>${minutes}</h5>
        <span>Menit</span>
    </div>
</div>

<div class="col-auto">
    <div class="countdown-item">
        <h5>${seconds}</h5>
        <span>Detik</span>
    </div>
</div>
`
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown-wedding").innerHTML = "<span class='text-center p-3 rounded text-light m-2'><h2>Acara Sudah Dimulai!</h2></span>";

    }
}, 1000)
const urlParams = new URLSearchParams(window.location.search);
const panggilan = urlParams.get('p');
const nama = urlParams.get('n');
const namaSambutan = document.querySelector('#nama-sambutan');
namaSambutan.innerHTML = `${panggilan} ${nama},`;

// copy
function copyText(el) {

    const content = jQuery(el)
        .closest('.credit-card')
        .find('.card-number')
        .text()
        .trim()
        .replace(/\s/g, '');

    navigator.clipboard.writeText(content);

    jQuery(el).html('<i class="fas fa-check"></i> Berhasil Disalin');

    setTimeout(() => {
        jQuery(el).html('<i class="fas fa-copy"></i> Salin');
    }, 2000);
}

// RSVP
window.addEventListener("load", function () {

    const form = document.getElementById("rsvp-form");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const status = document.getElementById("status").value;
        const nama = document.getElementById("nama").value.trim();

        if (nama === "") {
            Swal.fire({
                icon: "error",
                text: "Nama harus diisi!"
            });
            return;
        }

        if (status === "0") {
            Swal.fire({
                icon: "error",
                text: "Pilih salah satu status terlebih dahulu!"
            });
            return;
        }

        const data = new FormData(form);
        const action = form.action;

        const inputs = form.querySelectorAll(
            "input, select, textarea, button"
        );

        inputs.forEach(input => {
            input.disabled = true;
        });

        fetch(action, {
            method: "POST",
            body: data
        })
            .then(() => {

                Swal.fire({
                    icon: "success",
                    text: "Konfirmasi Kehadiran Anda Berhasil Terkirim"
                });

                form.reset();

            })
            .catch((error) => {

                Swal.fire({
                    icon: "error",
                    text: error.message
                });

            })
            .finally(() => {

                inputs.forEach(input => {
                    input.disabled = false;
                });

            });

    });

});

