import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import img from "@/components/imgs/mrigal.png";
import Image from "next/image";

const Politique = () => {
  return (
    <section className="m-4">
      <header className="border-b border-gray-200 mb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src={img} alt="My logo" />
          </Link>
          <div className="flex items-center space-x-4">
            <nav>
              <Button
                asChild
                className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
              >
                <Link href="/sign-in">Connexion</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                            bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                            text-black dark:text-white transition-all duration-300 
                            group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                            hover:shadow-md dark:hover:shadow-neutral-800/50"
              >
                <Link href="/sign-up">Inscription</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <h1 className="text-xl font-bold">
        Politique de Confidentialité et Mentions Légales
      </h1>
      <p>
        La SARL DigitservZ s'engage à protéger la vie privée et les données
        personnelles de ses utilisateurs, conformément à la loi algérienne n°
        18-07 du 10 juin 2018 relative à la protection des personnes physiques
        dans le traitement des données à caractère personnel et aux dispositions
        de la loi n° 09-04 du 5 février 2009 relative à la protection de la
        propriété intellectuelle.
      </p>
      <h3 className="text-lg font-semibold">Collecte des données</h3>
      <p>
        Nous collectons les données suivantes : - Nom et prénom - Adresse e-mail
        - Adresse IP - Données de navigation (pages visitées, durée de la
        visite, etc.)
      </p>
      <h3 className="text-lg font-semibold">Utilisation des données</h3>
      <p>
        Nous utilisons les données collectées pour : - Vous fournir les services
        que vous avez demandés - Vous envoyer des informations sur nos produits
        et services - Améliorer notre site web et nos services
      </p>
      <h3 className="text-lg font-semibold"> Protection des données</h3>
      <p>
        Nous prenons les mesures suivantes pour protéger vos données : -
        Stockage des données sur des serveurs sécurisés - Utilisation de
        protocoles de cryptage pour les données sensibles - Accès restreint aux
        données pour les employés autorisés
      </p>
      <h3 className="text-lg font-semibold"> Droits des utilisateurs</h3>
      <p>
        Vous avez le droit de : - Demander l'accès à vos données personnelles -
        Demander la rectification ou la suppression de vos données personnelles
        - Vous opposer à l'utilisation de vos données personnelles pour des fins
        de marketing
      </p>
      <h3 className="text-lg font-semibold">
        Responsabilité en cas de perte de données personnelles
      </h3>
      <p>
        La SARL DigitservZ prend toutes les mesures raisonnables pour protéger
        les données personnelles de ses utilisateurs. Cependant, en cas de perte
        de données personnelles due à une manipulation frauduleuse ou à une
        erreur ou attaque cybernétique, la SARL DigitservZ s'engage à : -
        Informer les utilisateurs concernés dans les meilleurs délais - Prendre
        toutes les mesures nécessaires pour contenir et résoudre l'incident -
        Collaborer avec les autorités compétentes, notamment l'ARPCE, pour
        enquêter sur l'incident - Prendre des mesures pour prévenir de futurs
        incidents similaires
      </p>
      <h3 className="text-lg font-semibold">Mentions Légales</h3>
      <p>
        - Propriété intellectuelle : Le contenu de ce site web est protégé par
        les lois sur la propriété intellectuelle algériennes. - Responsabilité :
        La SARL DigitservZ ne peut être tenue responsable des dommages directs
        ou indirects causés par l'utilisation de ce site web. - Liens
        hypertextes : Les liens hypertextes présents sur ce site web peuvent
        vous diriger vers des sites web tiers. La SARL DigitservZ ne peut être
        tenue responsable du contenu de ces sites web. - Modification des
        mentions légales : La SARL DigitservZ se réserve le droit de modifier
        les mentions légales à tout moment sans préavis.
      </p>{" "}
      <h3 className="text-lg font-semibold">Cookies</h3>
      <p>
        Nous utilisons des cookies pour améliorer votre expérience sur notre
        site web. Les cookies nous permettent de stocker vos préférences et vos
        paramètres de navigation. - Types de cookies : Nous utilisons les types
        de cookies suivants : - Cookies de session - Cookies persistants -
        Cookies tiers - Gestion des cookies : Vous pouvez refuser les cookies ou
        les supprimer à tout moment.
      </p>
      <h3 className="text-lg font-semibold">
        Mise à jour de la politique de confidentialité
      </h3>
      <p>
        La SARL DigitservZ met à jour régulièrement sa politique de
        confidentialité pour garantir que vos données personnelles soient
        protégées et traitées conformément à la législation en vigueur. -
        Dernière mise à jour : 28 mars 2025 - Modifications apportées : Écriture
        des textes légaux
      </p>
      <h3 className="text-lg font-semibold">
        Acceptation de la politique de confidentialité
      </h3>
      <p>
        En utilisant notre site web ou nos services, vous acceptez la politique
        de confidentialité de la SARL DigitservZ. Si vous n'acceptez pas cette
        politique, veuillez cesser d'utiliser notre site web et nos services.
      </p>{" "}
      <h3 className="text-lg font-semibold"> Contact</h3>{" "}
      <p>
        Pour toute question ou réclamation relative à la politique de
        confidentialité de la SARL DigitservZ, veuillez contacter notre délégué
        à la protection des données à l'adresse : sarldigitservz@gmail.com ou à
        l'adresse postale : ANPT, incubateur de Sidi Abdellah, Rahmania, Alger
      </p>
    </section>
  );
};

export default Politique;
