export default function MauritiusRoots() {
  return (
    <section
      id="histoire"
      className="bg-ivory px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl md:mb-16">
          <h2 className="mb-5 text-display text-ink-deep">Ancrés à Maurice.</h2>
          <p className="text-body-lg">
            Une production locale, proche de ceux qui cuisinent et servent nos produits chaque jour.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          <figure className="relative min-h-[420px] overflow-hidden rounded-2xl md:col-span-7 md:min-h-[640px]">
            <img
              src="/images/cylinder-01.jpg"
              alt="Élevage avicole local à Maurice"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/65 via-transparent to-transparent" />
            <figcaption className="absolute bottom-0 left-0 max-w-md p-7 text-ivory md:p-9">
              <h3 className="font-display text-3xl font-semibold md:text-4xl">
                Une filière locale
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-ivory/75">
                Des soins quotidiens, des équipes présentes et une attention constante à la fraîcheur.
              </p>
            </figcaption>
          </figure>

          <div className="grid gap-5 md:col-span-5 md:grid-rows-2 md:gap-6">
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl md:min-h-0">
              <img
                src="/images/cylinder-09.jpg"
                alt="Équipe au travail dans l'exploitation"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-2 gap-5 md:gap-6">
              <div className="relative min-h-[260px] overflow-hidden rounded-2xl">
                <img
                  src="/images/cylinder-12.jpg"
                  alt="Suivi quotidien de l'élevage"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex min-h-[260px] flex-col justify-end rounded-2xl bg-ink-deep p-6 text-ivory md:p-7">
                <p className="font-display text-2xl font-semibold leading-tight md:text-3xl">
                  Du local, sans détour.
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-ivory/70">
                  Un lien direct avec les familles, hôtels, restaurants et distributeurs mauriciens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
