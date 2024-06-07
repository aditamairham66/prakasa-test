import { Inertia } from '@inertiajs/inertia';
import GLightbox from 'glightbox';
import ThemeCustomizer from '@/Helpers/themeCustomizer';

const themeCustomizer = new ThemeCustomizer();

export const addScrollToTopListener = (): void => {
    const scrollToTopButton = document.querySelector('[data-toggle="back-to-top"]') as HTMLElement;
    if (!scrollToTopButton) return;

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 72) {
            scrollToTopButton.classList.add("flex");
            scrollToTopButton.classList.remove("hidden");
        } else {
            scrollToTopButton.classList.remove("flex");
            scrollToTopButton.classList.add("hidden");
        }
    });

    scrollToTopButton.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
};

export const addUploadInputListener = (): void => {
    const uploadInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[upload='file']");
    if (!uploadInputs.length) return;

    uploadInputs.forEach(function(input: HTMLInputElement) {
        input.addEventListener("change", function(event) {
            const image = document.getElementById('preview-image') as HTMLImageElement;

            if (input.files && input.files[0]) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    if (image) {
                        image.src = e.target?.result as string;
                    }
                };

                reader.readAsDataURL(input.files[0]);
            }
        });
    });
};

export const addButtonDeleteListener = (): void => {
    const btnTableDelete: NodeListOf<HTMLElement> = document.querySelectorAll('.btn-delete-table');
    if (!btnTableDelete.length) return;

    btnTableDelete.forEach((button) => {
        button.addEventListener('click', function(e) {
            const url = this.dataset.url || ''; // Ambil URL dari tombol

            // @ts-ignore
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Delete",
                cancelButtonText: "No, cancel!",
                customClass: {
                    confirmButton: "btn bg-primary text-white w-xs me-2 mt-2",
                    cancelButton: "btn bg-danger text-white w-xs mt-2"
                },
                buttonsStyling: false,
                showCloseButton: false,
             // @ts-ignore
            }).then(function(t) {
                if (t.isConfirmed) {
                    // Kirim permintaan DELETE menggunakan fetch
                    Inertia.delete(`${url}`, {
                        onSuccess: page => {
                            console.log(page)
                            button.classList.remove('hidden');
                        },
                        onError: errors => {
                            console.log(errors)
                            button.classList.remove('hidden');
                        },
                        onFinish: visit => {
                            console.log(visit)
                            button.classList.remove('hidden');
                        },
                    });
                }
            });
        });
    });
};

export const initializeLightbox = (): void => {
    const lightbox = GLightbox({
        selector: ".image-popup"
    });
};

export const buttonToggleMenuListener = (): void => {
    const buttonToggleMenu = document.querySelector("#button-toggle-menu") as HTMLElement | null;
    if (!buttonToggleMenu) {
        console.error('Element with ID "button-toggle-menu" not found.');
        return;
    }

    buttonToggleMenu.addEventListener("click", function() {
        const currentView = themeCustomizer.config.sidenav.view;
        const sidenavViewAttribute = themeCustomizer.html.getAttribute("data-sidenav-view");

        if (sidenavViewAttribute === "mobile") {
            themeCustomizer.showBackdrop();
            themeCustomizer.html.classList.toggle("sidenav-enable");
        } else if (currentView === "hidden") {
            if (sidenavViewAttribute === "hidden") {
                themeCustomizer.changeSidenavView(currentView === "hidden" ? "default" : currentView, false);
            } else {
                themeCustomizer.changeSidenavView("hidden", false);
            }
        } else if (sidenavViewAttribute === "sm") {
            themeCustomizer.changeSidenavView(currentView === "sm" ? "default" : currentView, false);
        } else {
            themeCustomizer.changeSidenavView("sm", false);
        }
    });
};
